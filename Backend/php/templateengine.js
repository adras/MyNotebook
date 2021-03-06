var TemplateEngine = Class.create({
    initialize: function () {
    },

    renderNotes: function () {
        $("noteContainer").innerHTML = "";
        $('noteContainer').appendChild(mainControl.templateNote);

        // The directive tells the rendering engine what has to appear where
        var directiveNotes = {
            'div.note': { // trigger a loop
                'note<-notes': {
                    '@class': function (arg) {
                        var tagFound = false;
                        for (var i = 0; i < arg.item.tags.length; i++) {
                            if (mainControl.isActiveTag(arg.item.tags[i].name) != -1) {
                                tagFound = true;
                            }
                        }

                        // Check if allnotes is active. If so, display the note when it has NO tags
                        if (mainControl.isActiveTag(mainControl.info.settings.allNotesTagName.value) != -1 && arg.item.tags.length == 0) {
                            tagFound = true;
                        }

                        if (!tagFound) {
                            return "hiddenNote";
                        }

                        // It looks like json_encode drops notes which are too long, and arg.item.content becomes null.
                        // This needs some further investigation. For now display an error message instead of the note.
                        if (!arg.item.content) {
                            arg.item.content = "<span style='color: #FF0000;'>Couldn't fetch note with id: " + arg.item.id + ", maybe it was too long</span>";
                            return "note";
                        }

                        // Remove previosly added span tags which highlight the searched text
                        arg.item.content = arg.item.content.replace(/<span class=\"searchText\">(.*?)<\/span>/gi, "$1");
                        var found = false;
                        if (mainControl.searchText != "") {

                            var searchItems = mainControl.searchText.split(" ");
                            for (var i = 0; i < searchItems.length; i++) {
                                var searchText = searchItems[i];
                                if (searchText == "") {
                                    continue;
                                }
                                // Old way - buggy
                                //var regex = "(" + searchText + ")([^>]*)";
                                //var replace = "<span class=\"searchText\">$1</span>$2";

                                // add <span class="searchText"> around searched text
                                // new way - less buggy but unfortunatelly finds not all occurences
                                var regex = "(>?)(" + searchText + ")([^>]*<)";
                                var replace = "$1<span class=\"searchText\">$2</span>$3";
                                var oldNoteContent = arg.item.content;
                                arg.item.content = arg.item.content.replace(new RegExp(regex, "gi"), replace);

                                // Check if the content of the note has changed. In this case the searched text was replaced.
                                // If something was replaced then something was found
                                if (oldNoteContent != arg.item.content) {
                                    found = true;
                                }
                            }
                        }
                        else {
                            // When no searchText is given, return all notes by setting found = true
                            found = true;
                        }
                        if (found) {
                            return "note";
                        } else {
                            return "hiddenNote";
                        }
                    },
                    '@id': "noteId-#{note.id}",
                    '.noteContent': "note.content",
                    'div.noteContent@ondblclick': function (arg) {
                        if (mainControl.info.settings["editNoteOnDoubleClick"].value == "1") {
                            return "javascript: mainControl.showEditNoteWindow (" + arg.item.id + ");";
                        }
                        return "javascript: void(0);";
                    },
                    '.noteTags': function (arg) {
                        var noteTags = "";
                        for (var i = 0; i < arg.item.tags.length; i++) {
                            if (arg.item.tags[i].name != undefined) {
                                noteTags += arg.item.tags[i].name + " ";
                            }
                        }
                        return noteTags;
                    },

                    'div.noteVisibility': function (arg) {
                        var imgName = "";
                        var altName = "";
                        var action = "";
                        if (arg.item.visibility == true) {
                            imgName = "btnPublic.png";
                            altName = "Public";
                            action = "javascript: mainControl.setNoteVisibility(" + arg.item.id + ", 'private')";
                        }
                        else {
                            imgName = "btnPrivate.png";
                            altName = "Private";
                            action = "javascript: mainControl.setNoteVisibility(" + arg.item.id + ", 'public')";
                        }
                        //return '<img src="images/' + imgName + '" alt="' + altName + '" onclick="' + action + '">';
                        // See in updatenote why this is uncommented
                        return (altName == "Public") ? "Private" : "Public";
                    },
                    'button.editButton': "'Edit'",
                    'button.editButton@onClick': 'javascript: mainControl.showEditNoteWindow(#{note.id})',
                    'button.deleteButton': "'Delete'",
                    'button.deleteButton@onClick': 'javascript: mainControl.windowManager.showConfirmDialog ("Do you really want to delete this note?", function () {mainControl.deleteNote(#{note.id});});'
                }
            }
        };

        // Render the template using only the directive and the notes array
        $('noteContainer').render(mainControl.info, directiveNotes);
    },

    renderTags: function () {
        // remove all tags but one
        $("tagArea").innerHTML = "";
        $('tagArea').appendChild(mainControl.templateTag);

        // The directive tells the rendering engine what has to appear where
        var directiveNotes = {
            'span': { // trigger a loop
                'tag<-tags': {
                    '.tag': "tag.name",
                    '.tag@onClick': "javascript: mainControl.selectTag('#{tag.name}');",
                    '.tag@id': "tagId-#{tag.id}",
                    '.tag@class': function (arg) {
                        // Check if allnotes is active, if so, only allNotes should be marked as active
                        if (mainControl.isActiveTag(mainControl.info.settings["allNotesTagName"].value) != -1) {
                            if (arg.tag.item.name == mainControl.info.settings["allNotesTagName"].value) {
                                return "selectedTag";
                            }
                            else {
                                return "tag";
                            }
                        }
                        if (mainControl.isActiveTag(arg.tag.item.name) != -1) {
                            return "selectedTag";
                        }
                        else {
                            return "tag";
                        }
                    },
                    //'img.downArrow@onClick':"javascript: mainControl.showTagContextMenu('#{tag.id}');",
                    'img.downArrow@id': "arrowId-#{tag.id}"
                }
            }
        };

        // Render the template using only the directive and the notes array
        $('tagArea').render(mainControl.info, directiveNotes);

        // Create context menues
        // Not sure if it's a good idea to add new ContextMenu objects each time tags are rendered.
        // The ContextMenues should be removed first.
        for (var i = 0; i < mainControl.contextMenues.length; i++) {
            mainControl.contextMenues[i].destroy();
            mainControl.contextMenues.splice(i, 1);
        }

        for (var i = 0; i < mainControl.info.tags.length; i++) {
            var tag = mainControl.info.tags[i];
            var context_menu_one = new Control.ContextMenu('arrowId-' + tag.id, {
                leftClick: true
            });

            context_menu_one.addItem({
                label: 'Rename',
                callback: function (elem) {
                    var id = elem.id.split("-")[1];
                    mainControl.showRenameTagWindow2(id);
                }
            });
            context_menu_one.addItem({
                label: 'Delete',
                callback: function (elem) {
                    var id = elem.id.split("-")[1];
                    mainControl.windowManager.showConfirmDialog("Do you really want to delete this tag?", function () { mainControl.deleteTag(id); });
                }
            });
            mainControl.contextMenues.push(context_menu_one);
        }
    },

    updateNote: function (note) {
        var directive = {
            'button.editButton@onClick': function (arg) {
                return 'javascript: mainControl.showEditNoteWindow(' + arg.context.id + ')';
            },
            'button.deleteButton@onClick': function (arg) {
                return 'javascript: mainControl.windowManager.showConfirmDialog ("Do you really want to delete this note?", function () { mainControl.deleteNote(' + arg.context.id + ');});';
            },
            'div.noteTags': function (arg) {
                var noteTags = "";
                for (var i = 0; i < arg.context.tags.length; i++) {
                    if (arg.context.tags[i].name != undefined) {
                        noteTags += arg.context.tags[i].name + " ";
                    }
                }
                return noteTags;
            },
            '.noteVisibility': function (arg) {
                var imgName = "";
                var altName = "";
                var action = "";
                if (arg.context.visibility == true) {
                    imgName = "btnPublic.png";
                    altName = "Public";
                    action = "javascript: mainControl.setNoteVisibility(" + arg.context.id + ", 'private')";
                }
                else {
                    imgName = "btnPrivate.png";
                    altName = "Private";
                    action = "javascript: mainControl.setNoteVisibility(" + arg.context.id + ", 'public')";
                }
                var result = '<img src="images/' + imgName + '" alt="' + altName + '" onclick="' + action + '"';

                // result is buggy with some browsers, but that image isn't used anymore - at the moment we use text which is way better colored *seriousface*
                // so set result to something more useful, like a proper value for the text
                // Hmm, could be the wrong direction, probably is, better negate it
                result = !altName;
                // Still not sure if negation was the correct way to solve the problem, but unless tested the solution works fine, at least in my mind
                // Good news everyone, the result was unexpected ("false")

                // do something else
                result = (altName == "Public") ? "Private" : "Public";

                return result;
            },

            '@class': function (arg) {
                var tagFound = false;
                for (var i = 0; i < arg.context.tags.length; i++) {
                    if (mainControl.isActiveTag(arg.context.tags[i].name) != -1) {
                        tagFound = true;
                    }
                }
                return (tagFound) ? "note" : "hiddenNote";
            },
            'div.noteContent': 'content',
            'div.noteContent@ondblclick': function (arg) {
                if (mainControl.info.settings["editNoteOnDoubleClick"].value == "1") {
                    return "javascript: mainControl.showEditNoteWindow (" + arg.context.id + ");";
                }
                return "javascript: void(0);";
            }
        };

        // Render the template using only the directive and the notes array
        $("noteId-" + note.id).render(note, directive);
    },

    removeNote: function (noteId) {
        for (var i = 0; i < mainControl.info.notes.length; i++) {
            if (mainControl.info.notes[i].id == noteId) {
                mainControl.info.notes.splice(i, 1);
            }
        }
        var elem = $("noteId-" + noteId);
        elem.parentNode.removeChild(elem);
    },

    renderSettings: function (note) {
        /* This might be required, check  browsercompatibility before finally removing
            $("settingsArea").innerHTML = "";
                $('settingsArea').appendChild (mainControl.templateSettings);
        */

        var directive = {
            'tr.settings': { // trigger a loop
                'setting<-settings': {
                    'td.settingsTableLeftColumn': function (arg) {
                        return arg.item.description;
                    },

                    'td.settingsTableRightColumn': function (arg) {
                        switch (arg.item.name) {
                            case "encryptionPassword":
                                var html = "";
                                //html += "<input type=\"password\" value=\"" + arg.item.value + "\"" + ">";
                                if (arg.item.value == "") {
                                    html += "<span style='margin-right: 56px; color: #FF0000;'>disabled</span>";
                                }
                                else {
                                    html += "<span style='margin-right: 56px; color: #00FF00;'>enabled</span>";
                                }
                                html += "<button onClick='mainControl.showEncryptionSettingsWindow();'>Edit</button>";
                                return html;
                            case "loginPassword":
                                html = "<input type=\"password\" value=\"" + arg.item.value + "\"></input>";
                                return html;
                            case "editNoteOnDoubleClick":
                                var checked = "";
                                if (mainControl.info.settings["editNoteOnDoubleClick"].value == "1") {
                                    checked = "checked='checked'";
                                }
                                var html = "<input type='checkbox' " + checked + " id='" + mainControl.info.settings["editNoteOnDoubleClick"].name + "'>";
                                return html;
                            default:
                                var html = "<input type=\"text\" value=\"" + arg.item.value + "\" id=\"" + arg.item.name + "\"></input>";
                                return html;
                        }


                    }
                }
            }

        };

        // Render the template using only the directive and the notes array
        $("settingsTable").render(mainControl.info, directive);
    },

    renderAll: function () {
        this.renderTags();
        this.renderNotes();
    },

    newNote: function (note) {
        mainControl.info.notes.splice(0, 0, note);
        var elem = $("noteId-" + mainControl.info.notes[1].id);
        var elem2 = elem.clone(true);
        elem2.id = "noteId-" + note.id;
        $("noteContainer").insertBefore(elem2, elem);
        this.updateNote(note);
    }
});
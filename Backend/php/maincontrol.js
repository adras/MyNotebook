var MainControl = Class.create({
	initialize: function () {
		this.requestHandler = new RequestHandler();
		this.responseHandler = new ResponseHandler();
		this.windowManager = new WindowManager();
		this.autoSuggest = new AutoSuggest($("body"));
		this.info = "";
		this.searchText = "";
		this.activeTags = ""; // Will be set by responseHandler.queryAll
		this.contextMenues = new Array();
		this.navMoveDelta = null;
	},
	
	updateView : function (){
		this.responseHandler.templateEngine.renderTags();
		this.responseHandler.templateEngine.renderNotes ();
	},

	selectTag : function (name){
		if (name == this.info.settings["allNotesTagName"].value) {
			// AllNotes tag is about to be selected, remove all other tags, so only the allNotesTag is enabled
			
			// First check if it's already selected
			if (this.isActiveTag (name) != -1) {
				// It is selected, remove it, and add newNotesTag instead
				this.activeTags.splice (0, this.activeTags.length);
				this.activeTags.push (this.info.settings["newNoteTagName"].value);
			}
			else {
				this.activeTags.splice (0, this.activeTags.length);
				this.activeTags.push (this.info.settings["allNotesTagName"].value);
			}
			this.updateView();
			return;
		}
		else {
			// This time a tag different from allnotes was selected, ensure allNotesTag is not in the list of activeTags
			var idx = this.isActiveTag (this.info.settings["allNotesTagName"].value);
			if (idx != -1) {
				this.activeTags.splice (idx, 1);
			}
		}
		
		var idx = this.isActiveTag (name);
		
		if (idx != -1) {
			this.activeTags.splice (idx, 1);
		}
		else{
			this.activeTags.push(name);
		}
		this.updateView();
	},

	isActiveTag : function (tag){
		for (var i = 0; i < this.activeTags.length; i++){
			if (this.activeTags[i] == tag) {
				return i;
			}
			else {
				// the tag isn't active, but when allNotesTag is currently selected this function has to return "true" aswell
				if (this.activeTags[i] == this.info.settings["allNotesTagName"].value) {
					return i;
				}
			}
		}
		return -1;
	},

	showNewNoteWindow : function(){
		this.windowManager.showNewNoteWindow();
  	},

	showEditNoteWindow : function( noteId){
		this.windowManager.showEditNoteWindow(noteId);
  	},

	cancelNewNoteWindow : function (){
  		this.windowManager.hideNewNoteWindow();
  	},

  	cancelEditNoteWindow : function (){
  		this.windowManager.hideEditNoteWindow();
  	},

  	saveNewNoteWindow : function () {
		tinyMCE.activeEditor.setProgressState(1);

		var note = new Object();
		note.content = tinyMCE.activeEditor.getContent();
		note.tags = $("newNoteWindowTags").getValue();

		var noteData = JSON.stringify(note);

		var request = {
			method : "POST",
			file : "index.php",
			parameters : "action=newNote&note=" + encodeURIComponent(noteData),
			onSuccess : function(resultString) {
				mainControl.responseHandler.handleNewNote(resultString);
			}
		};
		// Send request
		this.requestHandler.addRequest(request);
  	},

	login : function(password) {
		password = SHA256(password);
		var request = {
			method : "POST",
			file : "index.php",
			parameters : "action=login&password=" + password,
			onSuccess : function(resultString) {
				mainControl.responseHandler.handleLogin(resultString);
			}
		};

		this.windowManager.showLoadingDialog();
		
		// Send request
		this.requestHandler.addRequest(request);
	},

	logout : function() {
		this.getTemplate();
		var request = {
			method : "POST",
			file : "index.php",
			parameters : "action=logout",
			onSuccess : function(resultString) {
				mainControl.responseHandler.handleLogout(resultString);
			}
		};
		// Send request
		this.requestHandler.addRequest(request);
	},

	getTemplate : function() {
		var request = {
			file : "Template.php",
			method : "POST",
			onSuccess : function(data) {
				mainControl.responseHandler.handleGetTemplate(data);
			}
		};
		//this.windowManager.showLoadingDialog();
		
		// Send request
		this.requestHandler.addRequest(request);
	},

	queryAll : function() {
		var request = {
			method : "POST",
			file : "index.php",
			parameters : "action=queryAll",
			onSuccess : function(resultString) {
				mainControl.responseHandler.handleQueryAll(resultString);
			}
		};
		// Send request
		this.requestHandler.addRequest(request);
	},

	editNote : function(noteId) {
		var note = new Object();
		note.content = tinyMCE.activeEditor.getContent();
		note.tags = $("editNoteWindowTags").getValue();
		note.id = noteId;

		var data = ( {
			id : note.id,
			tags : note.tags,
			content : note.content
		});

		var dataJSON = JSON.stringify(data);

		var request = {
			method : "POST",
			file : "index.php",
			parameters : "action=editNote&note=" + encodeURIComponent(dataJSON),
			onSuccess : function(resultString) {
				mainControl.responseHandler.handleEditNote(resultString)
			}
		};
		// Send request
		this.requestHandler.addRequest(request);
	},

	deleteNote : function(noteId) {
		// Can be refactored to own method see full version of editNote
		var noteData = new Object();
		noteData.id = noteId;

		var data = ( {
			id : noteData.id
		});

		var dataJSON = JSON.stringify(data);
		// --- End of refactor

		var request = {
			method : "POST",
			file : "index.php",
			parameters : "action=deleteNote&note=" + encodeURIComponent(dataJSON),
			onSuccess : function(resultString) {
				mainControl.responseHandler.handleDeleteNote(resultString)
			}
		};
		// Send request
		this.requestHandler.addRequest(request);
		this.windowManager.hideConfirmDialog();
	},
	
	setNoteVisibility : function (noteId, visibility) {
		var noteData = new Object();
		noteData.id = noteId;
		noteData.visibility = (visibility == "public") ? true : false;

		var data = ( {
			id : noteData.id,
			visibility : noteData.visibility
		});

		var dataJSON = JSON.stringify(data);
		
		var request = {
			method : "POST",
			file : "index.php",
			parameters : "action=setNoteVisibility&note=" + encodeURIComponent(dataJSON),
			onSuccess : function(resultString) {
				mainControl.responseHandler.handleSetNoteVisibility(resultString)
			}
		};
		// Send request
		this.requestHandler.addRequest(request);
	},

	search : function () {
		var searchText = $("searchInput").value;
		this.searchText = searchText;
		this.responseHandler.templateEngine.renderNotes();
		/*
		var search = "test";
		var test = "lalatestlala-anothertestXX";
		var testNeu = test.replace (new RegExp(search, "gi"), "<div class=\"searchText\">$1</div>");
		var testNeuNeu = testNeu.replace (/<div class=\"searchText\">(.*?)<\/div>/gi, "$1");
		alert (test + "\n" + testNeu + "\n" + testNeuNeu);
		alert (RegExp.$1 + "\n" + RegExp.$2);
		*/
	},
	
	showLogin : function () {
			$("content").hide();
			$("loginArea").show();
			$("loginPassword").focus();
	},

	hideAll : function() {
			$("content").hide();
			$("loginArea").hide();
	},
	
	showSettings : function () {
		this.windowManager.showSettingsWindow ();
	},
	
	showEncryptionSettingsWindow : function () {
		this.windowManager.showEncryptionSettingsWindow();
	},
	
	hideEncryptionSettingsWindow : function () {
		this.windowManager.hideEncryptionSettingsWindow();
	},
	
	showRenameTagWindow : function (id) {
		this.windowManager.showRenameTagWindow(id);
	},

	showRenameTagWindow2 : function (id) {
		var parentNode = $('tagId-' + id).parentNode;
		var tagName = $('tagId-' + id).innerHTML;
		
		$('tagId-' + id).remove();
		$('arrowId-' + id).remove();

		var newInput = document.createElement("input");
		newInput.setAttribute("id", "tagNameInput-" + id);
		newInput.setAttribute("class", "tagNameInput");
		newInput.value = tagName;

		newInput.style.width=(8 * newInput.value.length + 10) + "px";
		document.onkeyup = function (e) {
			// Fix for IE
			if (!e) {
				e = window.event;
			}
			
			newInput.style.width=(8 * newInput.value.length + 10) + "px";
			if (e.keyCode == 13)
			{
				newInput.disabled = true;
				
				// This will send a request to the server
				mainControl.renameTag2 (id);
				
				// The request is sent, now we can mess with the content of the input box
				//newInput.value = "updating...";
				//newInput.style.width=(8 * newInput.value.length + 10) + "px";
				
				document.onkeyup = "javascript: void();";
			}
			if (e.keyCode == 27)
			{
				mainControl.responseHandler.templateEngine.renderTags();
				document.onkeyup = "javascript: void();";
			}
		}

		var arrow = document.createElement("img");
		arrow.src = "images/rightarrow.png";
		arrow.onclick = function () {
			mainControl.renameTag2 (id);
		}
		
		parentNode.appendChild (newInput);
		parentNode.appendChild (arrow);

		newInput.focus();
	},

	hideRenameTagWindow : function (id) {
		this.windowManager.hideRenameTagWindow(id);
	},
	
	renameTag : function (id) {
		for (var i = 0; i < this.info.tags.length; i++) {
			var tag = this.info.tags[i];
			tag.newName = $('renameTagWindowTagName').value;
		}
		var dataJSON = JSON.stringify(tag);
		
		var request = {
			method : "POST",
			file : "index.php",
			parameters : "action=renameTag&tag=" + encodeURIComponent(dataJSON),
			onSuccess : function(resultString) {
				mainControl.responseHandler.handleRenameTag(resultString)
			}
		};
		this.requestHandler.addRequest(request);
	},

	renameTag2 : function (id) {
		for (var i = 0; i < this.info.tags.length; i++) {
			var tag = this.info.tags[i];
			if (tag.id == id)
			{
				tag.newName = $('tagNameInput-' + id).value;
				break;
			}
		}
		var dataJSON = JSON.stringify(tag);
		
		var request = {
			method : "POST",
			file : "index.php",
			parameters : "action=renameTag&tag=" + encodeURIComponent(dataJSON),
			onSuccess : function(resultString) {
				mainControl.responseHandler.handleRenameTag(resultString)
			}
		};
		this.requestHandler.addRequest(request);
	},
	
	deleteTag : function (id) {
		var data = ( {
			id : id
		});

		var dataJSON = JSON.stringify(data);

		var request = {
			method : "POST",
			file : "index.php",
			parameters : "action=deleteTag&tag=" + encodeURIComponent(dataJSON),
			onSuccess : function(resultString) {
				mainControl.responseHandler.handleDeleteTag(resultString)
			}
		};
		this.requestHandler.addRequest(request);
		this.windowManager.hideConfirmDialog();
	},
	
	saveSettings : function () {
		/*
			loginPassword
			encryptionPassword
			allNotesTagName
			newNoteTagName
			defaultTags
		*/
		var defaultTags = $$("input[id='defaultTags']")[0].value;
		var newNoteTagName = $$("input[id='newNoteTagName']")[0].value;
		var allNotesTagName = $$("input[id='allNotesTagName']")[0].value;
		var editNoteOnDoubleClick = $$("input[id='editNoteOnDoubleClick']")[0].checked;
		
		if (editNoteOnDoubleClick == true) {
			editNoteOnDoubleClick = "1";
		}
		else {
			editNoteOnDoubleClick = "0";
		}
		
		
		if (newNoteTagName.split(" ").length > 1) {
			// Show alert window, only one tag is allowed here
		}
		
		if (allNotesTagName.split(" ").length > 1) {
			// Show alert window, only one tag is allowed here
		}

		if (defaultTags.split(" ").length > 1) {
			// Show alert window, only one tag is allowed here
		}

		var settings = this.info.settings;
		settings["defaultTags"].value = defaultTags;
		settings["newNoteTagName"].value = newNoteTagName;
		settings["allNotesTagName"].value = allNotesTagName;
		settings["editNoteOnDoubleClick"].value = editNoteOnDoubleClick;

		var dataJSON = JSON.stringify(settings);

		var request = {
			method : "POST",
			file : "index.php",
			parameters : "action=updateSettings&settings=" + encodeURIComponent(dataJSON),
			onSuccess : function(resultString) {
				mainControl.responseHandler.handleUpdateSettings(resultString)
			}
		};
		// Send request
		this.requestHandler.addRequest(request);
	}
});
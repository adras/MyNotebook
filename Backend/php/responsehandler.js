var ResponseHandler = Class.create( {
	initialize : function () {
		this.templateEngine = new TemplateEngine();
	},

	evalResponse : function(data) {
		if (data.responseJSON != null){
			return data.responseJSON;
		} else {
			alert("Invalid response: " + data.responseText);
		}
	},

	handleLogin : function(resultString) {
		var info = this.evalResponse(resultString);

		if (info.isLoggedIn == true && info.result == true) {
			mainControl.getTemplate();
		}
		else {
			mainControl.windowManager.hideLoadingDialog();
			$("loginPassword").value = "";
			if (info.isLoggedIn == false) {
				alert (info.message);
			}
		}
	},

	handleLogout : function(resultString) {
		var info = this.evalResponse(resultString);
		if (info.result == true || info.isLoggedIn == false) {
			mainControl.showLogin();
		} 
		else {
			alert (info.message);
		}
	},

	handleGetTemplate : function(data) {
		$("mainContent").innerHTML = data.responseText;
		mainControl.templateNote = $('noteContainer').children[0].cloneNode(true); 
		mainControl.templateTag = $('tagArea').children[0].cloneNode(true); 
		mainControl.templateSettings = $('settingsArea');
		mainControl.hideAll();
		mainControl.queryAll();
	},
	
	handleUpdateSettings : function (resultString) {
		var info = this.evalResponse(resultString);
		if (info.isLoggedIn == true && info.result == true) {
			mainControl.info.settings = info.settings;
		}
		else {
			alert (info.message);
		}
		this.templateEngine.renderNotes();
		mainControl.windowManager.hideSettingsWindow();
	},

	handleQueryAll : function(resultString) {
		var info = this.evalResponse(resultString);
		if (info.isLoggedIn == true) {
			mainControl.info = info;
			mainControl.activeTags = Array();
			mainControl.activeTags = mainControl.activeTags.concat (mainControl.info.settings["defaultTags"].value);

			$("loginArea").hide();

			this.templateEngine.renderAll();

			$("content").show();
		} else {
			mainControl.showLogin();
		}
		mainControl.windowManager.hideLoadingDialog();
	},

	handleSetNoteVisibility : function(resultString) {
		var info = this.evalResponse(resultString);
		
		for (var i = 0; i < mainControl.info.notes.length; i++) {
			if (mainControl.info.notes[i].id == info.note.id) {
				// We receive only the visibility attribute, so set only this
				mainControl.info.notes[i].visibility = info.note.visibility;
				
				// to render the complete note below, create a new variable which contains it
				note = mainControl.info.notes[i];
				break;
			}
		}
		
		this.templateEngine.updateNote(note);
	},

	handleNewNote : function(resultString) {
		var tinyEditor = tinyMCE.get("newNoteWindowTextArea");
		tinyEditor.setProgressState(0);
		mainControl.cancelNewNoteWindow();

		var info = this.evalResponse(resultString);
		if (info.result == true) {
			mainControl.info.tags = info.tags;
			this.templateEngine.newNote(info.note);
			this.templateEngine.renderTags();
		} else {
			alert (info.message);
			mainControl.showLogin();
		}
	},

	handleEditNote : function(resultString) {
		var info = this.evalResponse(resultString);

		if (info.result == true) {
			mainControl.info.tags = info.tags;
			for (var i = 0; i < mainControl.info.notes.length; i++) {
				if (mainControl.info.notes[i].id == info.note.id) {
					mainControl.info.notes[i] = info.note;
					break;
				}
			}
			
			mainControl.cancelEditNoteWindow();
			this.templateEngine.updateNote(info.note);
			this.templateEngine.renderTags();
			} else {
				alert (info.message);
				mainControl.showLogin();
		}
	},

	handleDeleteNote : function(resultString) {
		var info = this.evalResponse(resultString);
		if (info.result == true) {
			this.templateEngine.removeNote(info.note.id);
		}
		else {
			alert (info.message);
		}
	},
	
	handleDeleteTag : function(resultString) {
		var info = this.evalResponse(resultString);
		if (info.result == true) {
			mainControl.info.tags = info.tags;
			mainControl.info.notes = info.notes;
			this.templateEngine.renderAll();
		}
		else {
			alert (info.message);
		}
	},
	handleRenameTag : function(resultString) {
		var info = this.evalResponse(resultString);
		if (info.result == true) {
			mainControl.info.tags = info.tags;
			mainControl.info.notes = info.notes;
			mainControl.hideRenameTagWindow();
			this.templateEngine.renderAll();
		}
		else {
			alert (info.message);
		}
	}
});
var WindowManager = Class.create({
	setStandardOverlayEffectDurations : function () {
		Windows.overlayShowEffectOptions = this.showEffectOptions;
		Windows.overlayHideEffectOptions = this.hideEffectOptions;
	},
	
	initialize: function () {
		this.showEffectDuration = 0.2;
		this.hideEffectDuration = 0.2;
		this.setStandardOverlayEffectDurations();
		this.showEffectOptions = {
			duration: this.showEffectDuration
		};
		this.hideEffectOptions = {
			duration: this.showEffectDuration
		};
		
		// New note window
		this.newNoteWindow = new Window({id: "newNoteWindow", className: "alphacube", title: "Create new note",
								width:555, height:350, wiredDrag: false, minWidth: 555, minHeight: 350,
								maximizable: false, minimizable: false,  showEffectOptions : this.showEffectOptions,
																			hideEffectOptions : this.hideEffectOptions
							});
							
		this.windowObserver = {
			onResize: function (eventName, win) {
				var editorId = tinyMCE.activeEditor.editorId + "_tbl";
				$(editorId).style.width  = (win.width) + "px";
				$(editorId).style.height  = (win.height-50) + "px";

				editorId = tinyMCE.activeEditor.editorId + "_ifr";
				$(editorId).style.width  = (win.width-20) + "px";
				$(editorId).style.height  = (win.height-150) + "px";
			},
			onMove: function (eventName, win) {
				mainControl.autoSuggest.updatePosition();
			}
		};

		this.newNoteWindow.getContent().innerHTML = " <textarea id=\"newNoteWindowTextArea\" rows=20 style=\"align: center; overflow: visible;\"></textarea>"
			+ "<button class=\"leftButton\" onClick=\"mainControl.cancelNewNoteWindow();\">Cancel</button>"
			+ "<button class=\"rightButton\" onClick=\"mainControl.saveNewNoteWindow();\">Insert</button>"
			+ "<br><div style='text-align: center;'>"
			+ "Tags: <input id=\"newNoteWindowTags\" size='50'></input>"
			+ "</div>";
		tinyMCE.execCommand('mceAddControl', false, "newNoteWindowTextArea");

		// Edit note window
		this.editNoteWindow = new Window({id: "editNoteWindow", className: "alphacube", title: "Edit note",
									width:555, height:350, wiredDrag: false, minWidth: 555, minHeight: 350,
									maximizable: false, minimizable: false,  showEffectOptions : this.showEffectOptions,
																			hideEffectOptions : this.hideEffectOptions
							});
		this.editNoteWindow.getContent().innerHTML = "<textarea id=\"editNoteWindowTextArea\" style=\"overflow: visible;\"></textarea>"
			 + "<button class=\"leftButton\" onClick=\"mainControl.cancelEditNoteWindow();\">Cancel</button>"
			 + "<button class=\"rightButton\">Edit</button>"
			 + "<br><div style='text-align: center;'>"
			 + "Tags: <input id=\"editNoteWindowTags\" size='50'></input>"
			 + "</div>";
		tinyMCE.execCommand('mceAddControl', false, "editNoteWindowTextArea");

		// Settings window
		this.settingsWindow = new Window({id: "settingsWindow", className: "alphacube", title: "Edit Settings",
									width:450, height:205, wiredDrag: false, minWidth: 450, minHeight: 165,
									maximizable: false, minimizable: false, resizable: false,  showEffectOptions : this.showEffectOptions,
																			hideEffectOptions : this.hideEffectOptions
							});

		// Encryption Settings window
		this.encryptionSettingsWindow = new Window({id: "encryptionSettingsWindow", className: "alphacube", title: "Encryption settings",
									width:450, height:165, wiredDrag: false, minWidth: 450, minHeight: 165,
									maximizable: false, minimizable: false, resizable: false,  showEffectOptions : this.showEffectOptions,
																			hideEffectOptions : this.hideEffectOptions
							});
									
		// Rename tag window
		this.renameTagWindow = new Window({id: "renameTagWindow", className: "alphacube", title: "Rename tag",
									width:300, height:70, wiredDrag: false, minWidth: 300, minHeight: 70,
									maximizable: false, minimizable: false, resizable: false,  showEffectOptions : this.showEffectOptions,
																			hideEffectOptions : this.hideEffectOptions
							});

		// Obeserver is responsible to resize tinyMCE editor during size change of window
		Windows.addObserver (this.windowObserver);
		this.loadingDialogVisible = false;
	},
	
	showEditNoteWindow : function (noteId) {
		this.hideNewNoteWindow();
		this.hideSettingsWindow();
		this.hideRenameTagWindow();
		
		tinyMCE.execCommand('mceFocus',false,'editNoteWindowTextArea'); 
		
		// Get content of note by using a css selector
		var content = $$("#noteId-" + noteId + " .noteContent")[0].innerHTML;
		
		// Get tags of note by using a css selector
		var tags = $$("#noteId-" + noteId + " .noteTags")[0].innerHTML;
		// replace , by space
		tags = tags.replace (/,/g, " ");
		
		tinyMCE.activeEditor.setContent(content);
		$("editNoteWindowTags").setValue (tags);

		// Set events for autosuggest
		$("editNoteWindowTags").setAttribute("onFocus", "mainControl.autoSuggest.attach('editNoteWindowTags');");
		$("editNoteWindowTags").setAttribute("onBlur", "mainControl.autoSuggest.detach();");
		
		$("editNoteWindowTags").onBlur = function () {
			mainControl.autoSuggest.detach();
		}
		
		$$("div[id='editNoteWindow'] button[class='rightButton']")[0].onclick = function () {
			mainControl.editNote(noteId); 
		}
		
		this.editNoteWindow.showCenter();
		this.editNoteWindow.toFront();

		// Call resize once so tinyEditor gets the size of the window
		this.windowObserver.onResize ("onResize", this.editNoteWindow);
	},
	
	showNewNoteWindow : function () {
		this.hideEditNoteWindow();
		this.hideSettingsWindow();
		this.hideRenameTagWindow();
		
		tinyMCE.execCommand('mceFocus',false,'newNoteWindowTextArea'); 
		
		tinyMCE.activeEditor.setContent("");

		// Set events for autosuggest
		$("newNoteWindowTags").setAttribute("onFocus", "mainControl.autoSuggest.attach('newNoteWindowTags');");
		$("newNoteWindowTags").setAttribute("onBlur", "mainControl.autoSuggest.detach();");

		
		this.newNoteWindow.showCenter();
		this.newNoteWindow.toFront();

		// Call resize once so tinyEditor gets the size of the window
		this.windowObserver.onResize ("onResize", this.newNoteWindow);
	},

	showSettingsWindow : function () {
		this.hideEditNoteWindow();
		this.hideNewNoteWindow();
		this.hideRenameTagWindow();

		this.settingsWindow.setHTMLContent(mainControl.templateSettings.innerHTML) ;

		mainControl.responseHandler.templateEngine.renderSettings();
		
		this.settingsWindow.showCenter(true);
		this.settingsWindow.toFront();

	},
	
	showEncryptionSettingsWindow : function () {
		var content = "";

		content = "<button class=\"leftButton\" onClick=\"mainControl.hideEncryptionSettingsWindow();\">Cancel</button>"
			+ "<button class=\"rightButton\" onClick=\"alert('notimplemented')\">Insert</button>";

		this.encryptionSettingsWindow.setHTMLContent (content);
		this.encryptionSettingsWindow.showCenter(true);
	},
	
	showRenameTagWindow : function (id) {
		this.hideEditNoteWindow();
		this.hideNewNoteWindow();
		this.hideSettingsWindow();
		
		var tagName = "";		
		for (var i = 0; i < mainControl.info.tags.length; i++) {
			var tag = mainControl.info.tags[i];
			if (tag.id == id) {
				tagName = tag.name;
				break;
			}
		}
		
		this.renameTagWindow.getContent().innerHTML = 
		"<br>Enter name: <input style=\"float:right;\" id=\"renameTagWindowTagName\" value=\"" + tagName + "\"></input><br><br><div></div>" + 
		"<button class=\"leftButton\" onClick=\"mainControl.windowManager.hideRenameTagWindow();\">Cancel</button>"
    	+ "<button class=\"rightButton\" onClick=\"mainControl.renameTag(" + id + ");\">Rename</button>";

		this.renameTagWindow.showCenter(true);
		this.renameTagWindow.toFront();
	},
	
	showLoadingDialog : function () {
		if (this.loadingDialogVisible)
			return;
		
		// Overlay is usually fading, turn it off. Since the overlay blocks all user options this will not have
		// any influence on other windows, because it's not possible to execute them
		Windows.overlayShowEffectOptions = null;
		Windows.overlayHideEffectOptions = null;
		Dialog.info("Loading...", {
			width:150, 
			height:50, 
			windowParameters: { 
				className:"alphacube"
			},
			showEffect: Element.show,
			hideEffect: Element.hide,
		});
		this.loadingDialogVisible = true;
	},
	
	showConfirmDialog : function (message, confirmFunction) {
		Dialog.confirm (message, {
			windowParameters: { 
				className:"alphacube"
			},
			okLabel : "Ok",
			cancelLabel : "Cancel",
			onOk : confirmFunction,
			width: 300,
			showEffectOptions : this.showEffectOptions,
			hideEffectOptions : this.hideEffectOptions
		});
		var hello="";
	},
	
	hideNewNoteWindow : function () {
		this.newNoteWindow.hide();
	},

	hideEditNoteWindow : function () {
		this.editNoteWindow.hide();
	},
	
	hideSettingsWindow : function () {
		this.settingsWindow.hide();
	},

	hideEncryptionSettingsWindow : function () {
		this.encryptionSettingsWindow.hide();
	},
	
	hideRenameTagWindow : function () {
		this.renameTagWindow.hide();
	},

	hideLoadingDialog : function () {
		if (!this.loadingDialogVisible)
			return;

		// Turn overlay fading on again
		this.setStandardOverlayEffectDurations();

		Dialog.closeInfo();
		this.loadingDialogVisible = false;
	},
	hideConfirmDialog : function () {
		Dialog.closeInfo();
	}
	
	
});
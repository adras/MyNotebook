function MainControl() {
	// private
	var requestHandler = new RequestHandler();

	var evalResponse = function(data) {
		return "(" + data + ")";
	};

	var processSaveNote = function(data) {
		var note = evalResponse(data);
		var noteObject = eval(note);
		var elem = $("div#noteId-" + noteObject.id + " div#noteContent")[0].innerHTML = noteObject.content;
	};

	// public
	return {
		saveNote : function(noteId) {
				var noteData = new Object();
				noteData.content = $("div#noteId-" + noteId + " div#noteContent")[0].innerHTML;
				noteData.id = noteId;

				var data = ( {
					id : noteData.id,
					content : noteData.content
				});

				var dataJSON = JSON.stringify(data);

				var request = {
					type : "POST",
					url : "index.php",
					data : "action=EditNote&noteContent=Boston&note=" + dataJSON,
					success : function(data) {
						processSaveNote(data)
					}
				};
				// Send request
				requestHandler.addRequest(request);

			}
	};
};
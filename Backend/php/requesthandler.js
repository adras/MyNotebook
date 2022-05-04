var RequestHandler = Class.create( {
	initialize : function () {
		this.requests = new Array();
		this.processingRequest = false;
	},

	handleResponse : function(resultString) {
		this.requests.splice(0, 1);
		this.processingRequest = false;
		this.handleRequests();
	},

	handleRequests : function() {
		if (this.requests.length > 0 && this.processingRequest == false) {
			new Ajax.Request(this.requests[0].file, this.requests[0]);
			this.processingRequest = true;
		}
	},

	addRequest : function(request) {
		var oldSuccess ={};
		oldSuccess= request.onSuccess;
		
		request.onSuccess = function (data)	{
			try {
				oldSuccess(data);
			}
			catch (err) {
				alert ("An unexpected error occured: " + err);
			}
			mainControl.requestHandler.handleResponse(data);
		};
		
		this.requests.push(request);
		this.handleRequests();
	}
});

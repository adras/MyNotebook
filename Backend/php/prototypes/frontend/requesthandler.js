function RequestHandler () {
	var requests = new Array();
	var processingRequest = false;
	
	var handleResponse = function (data){
		requests.splice (0, 1);
		processingRequest = false;
		handleRequests ();
	}
	
	var handleRequests = function (){
		if (requests.length > 0 && processingRequest == false)
		{
			$.ajax(requests[0]);
			processingRequest = true;
		}
	}
	
	return{
		addRequest : function(request) {
			var oldSuccess = request.success;
			request.success = function (data) {
				oldSuccess(data);
				handleResponse (data);
			}
			requests.push (request);
			handleRequests ();
		}	
	}
}
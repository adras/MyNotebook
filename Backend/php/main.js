// MainScript - Is run at startup

var mainControl = new MainControl();
mainControl.getTemplate();

// Add your template scripts below - should be done somewhere else
if (window.addEventListener) {
	/** DOMMouseScroll is for mozilla. */
	window.addEventListener("scroll", 
		function (e) {
			if (window.scrollY > 80)
			{
				$("tagArea").style.top =  window.scrollY + "px";
			}
		}, false);
	
	/** IE/Opera. */
	window.onmousewheel = document.onmousewheel = function (a, b, c) {
		var e = document.getElementById("tagArea");
		var f = e.style["position"];
	};	
}	

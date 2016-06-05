(function() {

	var apiCall = photoGallery.apicall;
	var ui = photoGallery.ui;

		init();

		var search = function(event){
			event.preventDefault();
			var urlResults = new Array();
			var searchtext = document.getElementById("searchPhrase").value;
			apiCall.sendRequest(searchtext);
		}

		var clickEvent = document.getElementById("submitbtn");
		clickEvent.addEventListener('click', search, false);

		var nextEvent = document.getElementById("nextImage");
		nextEvent.addEventListener('click', nextFun, false);
		
		function nextFun(){
			var arrow = "right";
			ui.slideImage(arrow);
		}

		var prevEvent = document.getElementById("prevImage");
		prevEvent.addEventListener('click', prevFun, false);

		function prevFun(){
			var arrow = "left";
			ui.slideImage(arrow);
		}

		function init(){
			apiCall.sendRequest();
		}
}()); 
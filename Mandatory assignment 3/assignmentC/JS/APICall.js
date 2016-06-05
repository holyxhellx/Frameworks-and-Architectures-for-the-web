//Global variables:
var loading = false;
var phrase = null;

//Detect users browser:
var isFirefox;
var isSafari;
var isIE;
var isChrome;

//Location:
var latitude;
var longitude;

$(document).ready(function() {
	/*
	 *	Detect the users browser:
	 *	It determinds the browser from different plugins and addons pressent in the different windows
	 *	Source: http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
	 */
		// Firefox 1.0+
		isFirefox = typeof InstallTrigger !== 'undefined';
		console.log("isFirefox: "+isFirefox);
		// At least Safari 3+: "[object HTMLElementConstructor]"
		isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		console.log("isSafari: "+isSafari);
		// Internet Explorer 6-11
		isIE = /*@cc_on!@*/false || !!document.documentMode;
		console.log("isIE: "+isIE);
		// Chrome 1+
		isChrome = !!window.chrome && !!window.chrome.webstore;
		console.log("isChrome: "+isChrome);
	
	/*
	 * Call API with only location (init. browser start-up):
	 */
	//Set init difficulty:
	$('#buttonM').css("color", "red"); //Set color button medium

	//Loading bar
	loading = true;
	loadingBar(loading);

	//Geolocation - pending on browser
	if (isSafari == true || isFirefox == true) {
		APISafariFirefox();
	} else if (isChrome == true) {
		apiChrome();
	} else if (isIE == true) {
		console.log("The Browser Internet Explore has not been thoroughly tested, please use: Safari, firefox or Chrome");
	} else {
		console.log("Browser unknown, please use: Safari, firefox or Chrome");
	}
})

/*
 *	This method sets the Loading bar visibility (fadeIn/Out)
 */
function loadingBar(loading) {
	if(loading == true) {
		$('#loading-bar').fadeIn('fast');
	}
	if(loading == false) {
		$('#loading-bar').fadeOut('fast');
	}
}

/*	
 *	This method sets the url on the main-picture #image
 */
function onClick(){
	$('img').click(function(){
		var src = $(this).attr("src");
		if (src == undefined || src == null) {
			src = "http://i.imgur.com/rqqorvM.jpg";
		}
		console.log(src);

		if(src == "IMG/fb.jpg") { 
			//post via API links:
			console.log("social icon pushed FB");
		}
		else if(src == "IMG/gp.jpg") {
			//post via API links:
			console.log("social icon pushed GP");
		}
		else if(src == "IMG/tw.jpg" ) {
			//post via API links:
			console.log("social icon pushed TW");
		} else {
			//Set image in mainContainer instead of puzzle (active #image css)
			$("#image").attr("src", src);

			//Call init method from puzzle (reset puzzle with new image)
			init(src);
			showPuzzle(); //Show the puzzle image in main-Image-Container;
		}
	});
}

/*
 *	This method sets the fade In/Out animation to the photos-list class
 */
function fadeIn() {
	$("#photos-list").fadeIn('slow');
}
function fadeOut() {
	$("#photos-list").fadeOut('slow');
}


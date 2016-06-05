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

	if(navigator.geolocation){
		// Get the current position from HTML5 Geolocation
		navigator.geolocation.getCurrentPosition(function(position){
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;

			// Print coordinates to console:
			console.log("LAT"+latitude);
			console.log("LONG"+longitude);

			/*
			 * GET request to the API
			 */
			$.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=7517cc4213be1cdc59d1c27e8c801ec4&lat="+latitude+"&lon="+longitude+"&per_page=18&format=json&nojsoncallback=1", null, null, null).done(function(data){
				// This code is executed when we get a response from the API
				var arrPhotos = data.photos.photo;
				console.log(data); 
				
				arrPhotos.forEach( function(photo, index) {
					console.log(photo);

					url = 'https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'.jpg';
					console.log(url);

					// Appending images to the photos list
					$("#photos-list").append("<li style='margin: 2px 2px 2px 0; padding: 1px; float: left; list-style: none;'><img style='width: 100px; height: 100px; border-radius: 15px;' src='"+url+"'/></li>")
					
					//Insert CSS loading animation ENDED
					loading = false;
					loadingBar(loading);

					//Append onClick event
					onClick();

					//Animation fadeOut
					fadeIn();
				});
			});
	
		});
	$( "#photos-list" ).sortable();
	$( "#photos-list" ).disableSelection();
	}	

	/*
	 *	Call API with both location and search term provided
	 */
	$('#searchForm').submit(function(e) {
		// Stop the page from reloading
		e.preventDefault();

		//Clear pictures
		$("#photos-list").empty();

		//Loading bar
		loading = true;
		loadingBar(loading);

		/*
		 * Check if search-word has been entered
		 * - will always search for "spring" if no search-word
		 */
		var searchSample = "spring"; //Alter the API key to always contain search &text
		var phrase = document.getElementById("searchPhrase").value;
		console.log(phrase);
		if (phrase == null) {
			phrase = searchSample;
		};
		console.log(phrase); 

		//Insert CSS loading animation
   		//$('#loading-bar').show();

		/*
		 * Check if geolocation exists in then browser
		 */
		if(navigator.geolocation){
			// Get the current position from HTML5 Geolocation
			navigator.geolocation.getCurrentPosition(function(position){
				latitude = position.coords.latitude;
				longitude = position.coords.longitude;

				// Print coordinates to console:
				console.log("LAT"+latitude);
				console.log("LONG"+longitude);
				
				/*
				 * GET request to the API  // 42c4c2df25b50670ab964bef4372f3bd
				 */
				$.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=7517cc4213be1cdc59d1c27e8c801ec4&text="+phrase+"&lat="+latitude+"&lon="+longitude+"&per_page=18&format=json&nojsoncallback=1", null, null, null).done(function(data){
					// This code is executed when we get a response from the API
					var arrPhotos = data.photos.photo;
					console.log(data); 

					arrPhotos.forEach( function(photo, index) {
						console.log(photo);

						url = 'https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'.jpg';
						console.log(url);

						//Animation fadeIn
						fadeIn();
						
						// Appending images to the photos list     ,"+photo.secret+"
						$("#photos-list").append("<li style='margin: 2px 2px 2px 0; padding: 1px; float: left; list-style: none;'><img style='width: 100px; height: 100px; border-radius: 15px;' src='"+url+"'/></li>")
						
						//Insert CSS loading animation ENDED
						loading = false;
						loadingBar(loading);

						//Append onClick event
						onClick();
					});
				});
				
			});
		}
	})
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

/*
 *	Geolocation for chrome browser (due to new secure http standards => https)
 */
var tryGeolocation = function() {
  	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			browserGeolocationSuccess,
  			browserGeolocationFail, {
  				maximumAge: 50000, 
  				timeout: 20000, 
  				enableHighAccuracy: true
  			}
  		);
  	}
};

var browserGeolocationSuccess = function(position) {
	alert("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
};

var browserGeolocationFail = function(error) {
  switch (error.code) {
    case error.TIMEOUT:
      alert("Browser geolocation error !\n\nTimeout.");
      break;
    case error.PERMISSION_DENIED:
      if(error.message.indexOf("Only secure origins are allowed") == 0) {
        tryAPIGeolocation();
      }
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Browser geolocation error !\n\nPosition unavailable.");
      break;
  }
};

var tryAPIGeolocation = function() {
	// https://developers.google.com/maps/documentation/geolocation/get-api-key
	jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBDT_Ewy6g_p0t-kgZY9r7QfOYFBG-FMcU", function(success) {
		apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
  })
  .fail(function(err) {
    alert("API Geolocation error! \n\n"+err);
  });
};

var apiGeolocationSuccess = function(position) {
	alert("API geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
};

//Loading default setting
var loading = false;
var url = undefined;

$(document).ready(function() {
	//Global variables:
	var phrase = null;
	
	/*
	 * Call API with only location (init. browser):
	 */
	if(phrase == null || phrase == "" || phrase == " ") { 
		//Loading bar
		loading = true;
		loadingBar(loading);

		if(navigator.geolocation){
			// Get the current position from HTML5 Geolocation
			navigator.geolocation.getCurrentPosition(function(position){
				var latitude = position.coords.latitude;
				var longitude = position.coords.longitude;

				// Print coordinates to console:
				console.log("LAT"+latitude);
				console.log("LONG"+longitude);

				/*
				 * GET request to the API
				 */
				$.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=33e94eff9adf5b3c5731d777c6633c4a&lat="+latitude+"&lon="+longitude+"&per_page=18&format=json&nojsoncallback=1", null, null, null).done(function(data){
					// This code is executed when we get a response from the API
					var arrPhotos = data.photos.photo;
					console.log(data); 
					
					arrPhotos.forEach( function(photo, index) {
						console.log(photo);

						url = 'https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'.jpg';
						console.log(url);
						// Appending images to the photos list
						$("#photos-list").append("<li style='margin: 2px 2px 2px 0; padding: 1px; float: left; list-style: none;'><img style='width: 100px; height: 100px; border-radius: 15px;' src='"+url+"' onclick='selectPicture()'/></li>")
						
						//Insert CSS loading animation ENDED
						loading = false;
						loadingBar(loading);
					});
				});
		
			});
			//$("#loading-bar img").hide();
		}

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
				var latitude = position.coords.latitude;
				var longitude = position.coords.longitude;

				// Print coordinates to console:
				console.log("LAT"+latitude);
				console.log("LONG"+longitude);
				
				/*
				 * GET request to the API  // 42c4c2df25b50670ab964bef4372f3bd
				 */
				$.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=33e94eff9adf5b3c5731d777c6633c4a&text="+phrase+"&lat="+latitude+"&lon="+longitude+"&per_page=18&format=json&nojsoncallback=1", null, null, null).done(function(data){
					// This code is executed when we get a response from the API
					var arrPhotos = data.photos.photo;
					console.log(data); 

					arrPhotos.forEach( function(photo, index) {
						console.log(photo);

						url = 'https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'.jpg';
						console.log(url);
						
						// Appending images to the photos list     ,"+photo.secret+"
						$("#photos-list").append("<li style='margin: 2px 2px 2px 0; padding: 1px; float: left; list-style: none;'><img style='width: 100px; height: 100px; border-radius: 15px;' src='"+url+"' onclick='selectPicture()'/></li>")
						
						//Insert CSS loading animation ENDED
						loading = false;
						loadingBar(loading);
					});
				});
				
			});
		}
		if(!navigator.geolocation) {
			/*
			 * GET request to the API  // 42c4c2df25b50670ab964bef4372f3bd
			 */
			$.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=33e94eff9adf5b3c5731d777c6633c4a&text="+phrase+"&per_page=18&format=json&nojsoncallback=1", null, null, null).done(function(data){
				// This code is executed when we get a response from the API
				var arrPhotos = data.photos.photo;
				console.log(data); 

				arrPhotos.forEach( function(photo, index) {
					console.log(photo);

					url = 'https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'.jpg';
					console.log(url);

					// Appending images to the photos list     ,"+photo.secret+"
					$("#photos-list").append("<li style='margin: 2px 2px 2px 0; padding: 1px; float: left; list-style: none;'><img style='width: 100px; height: 100px; border-radius: 15px;' src='"+url+"' onclick='selectPicture()'/></li>")
					
					//Insert CSS loading animation ENDED
					loading = false;
					loadingBar(loading);
				});
			});
		}
		$( "#photos-list" ).sortable();
		$( "#photos-list" ).disableSelection();
	})
})

/*
 *	This method sets the Loading bar visibility
 */
function loadingBar(loading) {
	if(loading == true) {
		$('#loading-bar').show();
	}
	if(loading == false) {
		$('#loading-bar').hide();
	}
}

/*	
 *	This method sets the url on the main-picture #image
 */
function selectPicture(url) {
	alert("Do the pong dance! - because puzzle-soon-to-be");
	
	//set default picture
	if (url == undefined || url == null) {
		url = "http://i.imgur.com/rqqorvM.jpg"
	}
	console.log(url);

	$("#image").attr("src", url);
}


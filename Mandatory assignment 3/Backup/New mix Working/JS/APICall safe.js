$(document).ready(function() {
	//Global variables:
	var phrase = null;

	/*
	 * Call API with only location (init. browser):
	 */
	if(phrase == null || phrase == "" || phrase == " ") { 
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

					// new set of images to photo list 
					$("#photos-list").empty();
					
					arrPhotos.forEach( function(photo, index) {
						console.log(photo);
						// Appending images to the photos list
						$("#photos-list").append("<li style='margin: 2px 2px 2px 0; padding: 1px; float: left; list-style: none;'><img style='width: 100px; height: 100px; border-radius: 15px;' src='https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+".jpg' /></li>")
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

					// new set of images to photo list 
					$("#photos-list").empty();

					arrPhotos.forEach( function(photo, index) {
						console.log(photo);

						// Appending images to the photos list
						$("#photos-list").append("<li style='margin: 2px 2px 2px 0; padding: 1px; float: left; list-style: none;'><img style='width: 100px; height: 100px; border-radius: 15px;' src='https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+".jpg' /></li>")
					});
				});
		
			});
		}
		//Insert CSS loading animation ENDED
  		//$('#loading-bar').hide();

		$( "#photos-list" ).sortable();
		$( "#photos-list" ).disableSelection();
	})
})
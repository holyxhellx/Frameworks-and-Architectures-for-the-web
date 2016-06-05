//Flickr API - Safari/Firefox browser

function apiChrome() {
	  // GET location request API by google API and select pictures from the Flickr API (Chrome browser)
    // Source: https://developers.google.com/web/fundamentals/native-hardware/user-location/obtain-location
    
    //If the connection is HTTPS secure - then this function is best practise
    //tryGeolocation();
    
    //Use google API location
    tryAPIGeolocation();
}

/*
 * GET request to the API
 */
function collectFlickrPic() {
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
  $( "#photos-list" ).sortable();
  $( "#photos-list" ).disableSelection();


  /*
   *  Call API with both location and search term provided
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
  })
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
	//alert("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
  latitude = position.coords.latitude;
	longitude = position.coords.longitude;
  console.log("lat: " +latitude);
  console.log("lng: " +longitude);

  if (latitude != undefined && longitude != undefined) {
    collectFlickrPic();
  }
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
	//alert("API geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
  console.log("lat-api: " +latitude);
  console.log("lng-api: " +longitude);

  collectFlickrPic();
};

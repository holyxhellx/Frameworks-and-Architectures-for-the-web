if (typeof photoGallery === "undefined") {
	var photoGallery = {};
}

photoGallery.apicall = {

	createURL: function(searchPhrase){
		//Only used if no search-word has been entered:
		var searchSample = "spring";
		var phrase = searchPhrase;
		if (phrase == null) {
			phrase = searchSample;
		};

		var latitude = 55.65000000;
		var longitude = 12.89000000;

		// Check if geolocation exists in then browser
		if(navigator.geolocation){
			// Get the current position from HTML5 Geolocation
			navigator.geolocation.getCurrentPosition(function(position){
				var latitude = position.coords.latitude;
				var longitude = position.coords.longitude;

				console.log("LAT"+latitude);
				console.log("LONG"+longitude);
			});
			//&tags can be used instead if alteration of serch terms is wanted.
			var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a4cfae60981b2822b7fc17de196abbd9&lat="+latitude+"&lon="+longitude+"&text="+phrase+"&radius=5&per_page=200&format=json&nojsoncallback=1";
			console.log("Using Geolocation API");
			return url;
		} else {
			//&tags can be used instead if alteration of serch terms is wanted.
			var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a4cfae60981b2822b7fc17de196abbd9&text="+phrase+"&per_page=100&format=json&nojsoncallback=1";
			console.log("Not using Geolocation API");
			return url;
		}
	},

	createRequest: function(){
		return new XMLHttpRequest();
	},
	
	sendRequest: function(searchphrase){
		var url = this.createURL(searchphrase);
		var xhr = this.createRequest();

		xhr.open("GET", url); //null, null, null - its detrimental effects to the end user's experience - http://xhr.spec.whatwg.org/
		var urlArray = new Array();
		xhr.onreadystatechange = function(){
			if (xhr.readyState === 4) {
				var status = xhr.status;
				if ((status >= 200 && status < 300) || (status === 304)){
					response = xhr.responseText;
					//console.log("response" +response); //JSON response text
					res = JSON.parse(response);
					
					// Appending images to the photos list
					var prefix = res.photos.photo;
					for (var i = 0; i < prefix.length; i++) {
						var urlString = "https://farm" + prefix[i].farm + ".staticflickr.com/" + prefix[i].server + "/" + prefix[i].id + "_" + prefix[i].secret + "_z.jpg";
						urlArray[i] = urlString;
					};


					var image = document.getElementById('image');
					image.src = urlArray[0];
					photoGallery.ui.mainArray(urlArray);
					photoGallery.ui.createThumbnail(1);
					photoGallery.ui.createLink(urlArray.length);
				} else {
					alert("An Error Accured");
				}
			}
		};
		xhr.send(null);
	}
};

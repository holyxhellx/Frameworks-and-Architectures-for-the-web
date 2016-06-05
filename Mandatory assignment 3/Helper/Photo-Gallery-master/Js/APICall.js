if (typeof photoGallery === "undefined") {
	var photoGallery = {};
}

photoGallery.apicall = {

	createURL: function(searchPhrase){
		var searchSample = "spring";
		var phrase = searchPhrase;
		if (phrase == null) {
			phrase = searchSample;
		};
		var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a4cfae60981b2822b7fc17de196abbd9&tags=" + phrase + "&per_page=100&format=json&nojsoncallback=1";
		return url;
	},

	createRequest: function(){
		return new XMLHttpRequest();
	},
	
	sendRequest: function(searchphrase){
		var url = this.createURL(searchphrase);
		var xhr = this.createRequest();
		xhr.open("GET", url);
		var urlArray = new Array();
		xhr.onreadystatechange = function(){
			if (xhr.readyState === 4) {
				var status = xhr.status;
				if ((status >= 200 && status < 300) || (status === 304)){
					response = xhr.responseText;
					res = JSON.parse(response);
					
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

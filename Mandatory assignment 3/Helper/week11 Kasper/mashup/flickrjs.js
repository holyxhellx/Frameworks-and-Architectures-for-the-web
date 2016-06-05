$(document).ready(function(){
	initFlickr("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a4cfae60981b2822b7fc17de196abbd9&lat="+39.9042+"&lon="+116.4074+"&radius=5&tags=flower&per_page=200&format=json&nojsoncallback=1");
});

function initFlickr(url){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
					$.get(url, null, null, null).done(function(data){
						var arrPhotos = data.photos.photo;
						console.log(data);
						arrPhotos.forEach( function(photo, index) {
							//console.log(photo);
							$("#photos-list").append("<li style='margin: 3px 3px 3px 0; padding: 1px; float: left; list-style: none;'><img style='width: 100px; height: 100px;' src='https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+".jpg' /></li>")
						});
    				});

				});
			$( "#photos-list" ).sortable();
			$( "#photos-list" ).disableSelection();

	}
}

	


//})
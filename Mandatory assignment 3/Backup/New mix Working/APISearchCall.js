API: lat, lng and search
"https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a4cfae60981b2822b7fc17de196abbd9&text=spring&lat=55.0&lon=12.00&radius=5&per_page=200&format=json&nojsoncallback=1"

Result: {
	"photos":{
		"page":1,"pages":1,"perpage":200,"total":"6","photo":[
			{"id":"26784302916","owner":"105503886@N05","secret":"241ddb990e","server":"7331","farm":8,"title":"Hey :)","ispublic":1,"isfriend":0,"isfamily":0},
			{"id":"25731219883","owner":"60614381@N07","secret":"37e66955d7","server":"1498","farm":2,"title":"Far\u00f8 (Faroe) Bridge","ispublic":1,"isfriend":0,"isfamily":0},
			{"id":"17793073909","owner":"12983708@N08","secret":"dafa3184b9","server":"8883","farm":9,"title":"Dandelions","ispublic":1,"isfriend":0,"isfamily":0},
			{"id":"16143397193","owner":"42388593@N04","secret":"6569e31b5f","server":"7627","farm":8,"title":"Ra\u030age-Rook -Corvus frugilegus","ispublic":1,"isfriend":0,"isfamily":0},
			{"id":"16762266642","owner":"42388593@N04","secret":"8683c9cd0a","server":"8627","farm":9,"title":"Ra\u030age-Rook -Corvus frugilegus","ispublic":1,"isfriend":0,"isfamily":0},
			{"id":"16575949300","owner":"42388593@N04","secret":"2eedc8ff58","server":"8664","farm":9,"title":"Ra\u030age-Rook -Corvus frugilegus","ispublic":1,"isfriend":0,"isfamily":0},
		]
	},
	"stat":"ok"
}

API: lat lng

"https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a4cfae60981b2822b7fc17de196abbd9&lat=55.0&lon=12.00&radius=5&per_page=200&format=json&nojsoncallback=1"

Result: {
	"photos":{
		"page":1,"pages":5,"perpage":200,"total":"864","photo":[
			{"id":"26784302916","owner":"105503886@N05","secret":"241ddb990e","server":"7331","farm":8,"title":"Hey :)","ispublic":1,"isfriend":0,"isfamily":0},
			{"id":"26346215271","owner":"65134867@N02","secret":"729fd61e9c","server":"1615","farm":2,"title":"Vor Frue Kirke - Vordingborg 2015-11-08-051","ispublic":1,"isfriend":0,"isfamily":0},
			{"id":"25809617523","owner":"65134867@N02","secret":"5cc10d6bf1","server":"1681","farm":2,"title":"Vor Frue Kirke - Vordingborg 2015-11-08-053","ispublic":1,"isfriend":0,"isfamily":0},
			{"id":"26412376035","owner":"65134867@N02","secret":"ed10ae1a87","server":"1485","farm":2,"title":"Vor Frue Kirke - Vordingborg 2015-11-08-059r","ispublic":1,"isfriend":0,"isfamily":0},
		]
	},
	"stat":"ok"}
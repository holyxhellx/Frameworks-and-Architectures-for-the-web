if (typeof photoGallery === "undefined") {
	var photoGallery = {};
}

photoGallery.ui = {

	imageHolder: function(arr){
		var myArray = new Array();
		myArray = arr.slice(0);
	},

	//create links and handle pagination
	createLink: function(itemNum){
		var itemPerPage = 10;
		var itemNumber = itemNum;
		var totalPage = Math.ceil(itemNum/10);
		//create HTML page tag

		var linkExists = document.getElementById('pageLink');
		
		if (linkExists.childNodes.length <= 1) {
			var ulSelector = document.getElementById("pageLink");
			for (var i = 1; i <= totalPage; i++) {
				var tempLi = document.createElement("li");
				tempLi.innerHTML = i;
				tempLi.setAttribute("id", i);
				if (i == 1) {
					tempLi.setAttribute("class", "selectedStyle");
				};
				ulSelector.appendChild(tempLi);
			};
		};
		// reset CSS Page Selector Style
		// var el = document.getElementsByClassName("selectedStyle")[0];
		// el.removeAttribute("class");
		// var newEl = document.querySelectorAll("ul > li")[0];
		// newEl.setAttribute("class", "selectedStyle");
			//adding pagination functionality
			
		var selectpage = document.querySelectorAll('ul#pageLink li');
		for (var j = 0; j < totalPage; j++) {
		 	var  myPage = selectpage[j];
		 	myPage.addEventListener('click', ChangePage, false);
		};

		//triggers when user click the page links
		function ChangePage(zEvent){
			var pg = document.querySelectorAll('ul#pageLink li');
		    for (var x = 0; x < totalPage; x++) {
	 			var  selectedLink = pg[x];
	 			selectedLink.removeAttribute("class");
			};
			var imageID = this.getAttribute("id");
			this.setAttribute("class", "selectedStyle");
			photoGallery.ui.createThumbnail(imageID);
			}
	},

	//a method to hold the array of URLs
	mainArray: function(arr){
		var scopeArray = arr;

		this.getValue = function(){
			return scopeArray;
		};

		this.setValue = function(arr){
			scopeArray = arr;
		};
	},

	//Creates and manages image thumbnails
	createThumbnail: function(indx){
		var thumbArray = new Array();
		thumbArray = this.getValue();
		var pageSize = 10;
		
		var pageIndex = indx;
		var lowIndx = ((pageIndex*pageSize) - pageSize);
		var upIndx = (pageIndex*pageSize);

		
		var carImg = document.getElementById('image');
		carImg.src = thumbArray[lowIndx];

		var tempelement = document.getElementById("thumbnail");

		var childNodes = tempelement.childNodes;

   		for(var i = childNodes.length-1; i >= 0; i-- ){
       		var childNode = childNodes[i];
            childNode.parentNode.removeChild(childNode);
    	}

		var element = document.getElementById("thumbnail");
		for (var i = lowIndx; i < upIndx; i++) {
			var para = document.createElement("img");
			para.setAttribute("src", thumbArray[i]);
			para.setAttribute("id", i);
			element.appendChild(para);
		};
	
		var selectthumb = document.querySelectorAll('div#thumbnail img');
		for (var j = 0; j < selectthumb.length; j++) {
 		   var  selectedImage = selectthumb[j];
 		   selectedImage.addEventListener('click', GetID, false);
		};

		function GetID(zEvent){
			var imageID = this.getAttribute("id");
			var carouselImage = document.getElementById('image');
			carouselImage.src = thumbArray[imageID];
		}
	},

	slideImage: function(arrow){
		var tempArray = new Array();
		tempArray = this.getValue();
		var length = tempArray.length;
		var img = document.getElementById('image').src;
		var index = tempArray.indexOf(img);
		
		if (arrow === "right") {
			var image = document.getElementById('image');
			if (index < (length-1)) {
				image.src = tempArray[index+1];
			}else {
				image.src = tempArray[0];
			};

		}else if (arrow === "left") {
			var image = document.getElementById('image');
			if ((index-1) >= 0) {
				image.src = tempArray[index-1];
			}else {
				image.src = tempArray[length-1];
			};

		};
	},


}
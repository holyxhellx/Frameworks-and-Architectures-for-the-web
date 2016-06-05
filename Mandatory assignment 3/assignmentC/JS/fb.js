
function fb_publish() {
  // Collect your highscore
  getHighScore();

  // Post the highscore to facebook
  FB.ui(
     {
       method: 'feed',
       name: 'Photo Flickr Puzzle',
       link: 'http://asbp.frwaw.itu.dk/Photo%20Flickr%20Puzzle/index.html',
       picture: 'http://i.imgur.com/eZAT2qY.jpg',
       caption: 'Puzzle High score: '+highscore +' in ' +puzzleDoneTotal +' attempts',
       description: 'Try out, and see if you can beat my highscore!',
       message: 'Puzzle by Flickr is not for softcore people'
     },
     function(response) {
       if (response && response.post_id) {
         alert('Post was published on facebook with your highscore: '+highscore +' in ' +puzzleDoneTotal +' attempts.');
       } else {
         alert('Post was not published.');
       }
     }
   );
}
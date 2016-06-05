//Source: (counter function) http://stackoverflow.com/questions/3049553/simple-jquery-second-counter
//Global Variable:
var time = "0";
var scoreTime = "0";
var puzzleDone = "0";
var moves = "0";
var difficulty = "0";
var highscore = "0";
var puzzleDoneTotal = "0";

// Counter and click to get current value
function counter() {
	clearTime();
	setInterval("time++",1000); // Increment value every second
  	console.log("counting: " +time);

  	//show the current counter value (development output / can be activated in index.html)
  	$("#showval").click(function(){
  		alert("current time: "+time);
    	console.log("current time "+time);
  	});
}

function getTimeOnComplete() {
	puzzleDone++;
	
	//Point algorithm: (not 100% balanced - need test unit)
	scoreTime = ((10 * puzzleDone) - (time * (0.5 * moves))) + (difficulty * (0.5 * puzzleDone));

	var scoreText = "Score: "+scoreTime; 
	var puzzleText = "Puzzles: "+puzzleDone;
	$("#point").text(scoreText);
	$("#puzzlesDone").text(puzzleText); 
	console.log("Complete time: "+time +" puzzles done: " +puzzleDone);

	//Compare to highscore:
	getHighScore();
	setHighScore();
}

/*
 *	Local Storeage function getter and setter
 */
	function getHighScore() {
	  if (localStorage.getItem('highscore') == null) {
	    highscore = "-999";
	    console.log("nothing stored");
	  } else {
	  	highscore = localStorage.getItem('highscore');
	  	console.log("stored highscore: "+scoreTime);
	  }
	}

	function setHighScore() {
		if (scoreTime > highscore) {
			localStorage.setItem('highscore', scoreTime);
			alert("New highscore.");
		} else {
	    	alert("I know you can do better than that...");
		}
	}
	function setIncrementPuzzleDone() {
	  	if (localStorage.getItem('puzzleDoneTotal') == null) {
	    	puzzleDoneTotal = "0";
		} else {
			puzzleDoneTotal = localStorage.getItem('puzzleDoneTotal');
		}
		puzzleDoneTotal++;
		localStorage.setItem('puzzleDoneTotal', puzzleDoneTotal);
		console.log("puzzleDoneTotal: "+puzzleDoneTotal);
	}

function clearScore() {
	// Clear counters
	time = "0";
	moves = "0";
	scoreTime = "0";
	puzzleDone = "0";
	
	// Set output text
	var scoreText = "Score: "+time; 
	var puzzleText = "Puzzles: "+puzzleDone;
	$("#point").text(scoreText);
	$("#puzzlesDone").text(puzzleText); 
}
 
function setDifficulty(value) {
	difficulty = value;
	console.log(difficulty);
}

function incementMovesDone() {
	moves++;
	console.log("incementMoveDone: "+moves);
}

function clearMoves() {
	moves = "0";
}

function clearTime() {
	time = "0";
}

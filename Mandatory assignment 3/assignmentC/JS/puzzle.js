//Source: (lib) http://code.tutsplus.com/tutorials/create-an-html5-canvas-tile-swapping-puzzle--active-10747
//Global varriables:
var PUZZLE_DIFFICULTY = 3; //Set the number of rows and columns
const PUZZLE_HOVER_TINT = '#009900';

var _stage;
var _canvas;

var _img;
var _pieces;
var _puzzleWidth;
var _puzzleHeight;
var _pieceWidth;
var _pieceHeight;
var _currentPiece;
var _currentDropPiece;  

var _mouse;

/*
*   Set the puzzle to easy/med/hard difficulty:
*   Note: by setting a new difficulty, the game is reset.
*/

    function setEasy() {
        PUZZLE_DIFFICULTY = 2;
        $('#buttonE').css("color", "red");
        $('#buttonM').css("color", "black");
        $('#buttonH').css("color", "black");
        init();
        clearScore(); //Clear the score (counter.js)
        var value = 150;
        setDifficulty(value); //Set the difficulty-base-score (counter.js)
    }

    function setMed() {
        PUZZLE_DIFFICULTY = 3;
        $('#buttonM').css("color", "red");
        $('#buttonE').css("color", "black");
        $('#buttonH').css("color", "black");
        init();
        clearScore(); //Clear the score (counter.js)
        var value = 700;
        setDifficulty(value); //Set the difficulty-base-score (counter.js)
    }

    function setHard() {
        PUZZLE_DIFFICULTY = 4;
        $('#buttonH').css("color", "red");
        $('#buttonM').css("color", "black");
        $('#buttonE').css("color", "black");
        init();
        clearScore(); //Clear the score (counter.js)
        var value = 1500;
        setDifficulty(value); //Set the difficulty-base-score (counter.js)
    }

//Hide/show puzzle image:
    function hidePuzzle() {
        setTimeout(function() {
            $("#puzzle").fadeOut('slow');
        }, 1000);
    }

    function showPuzzle() {
        $("#puzzle").fadeIn('slow');
    }

//Init puzzle game by selected image:
function init(url){
    _img = new Image();
    _img.addEventListener('load',onImage,false);
    if (url == undefined) {
        _img.src = "IMG/defPuzzleImage.jpg";
    } else {
       _img.src = url;
    }
    clearMoves() //Clear moves for new puzzle (counter.js)
}

//Divide the image:
function onImage(e){
    _pieceWidth = Math.floor(_img.width / PUZZLE_DIFFICULTY)
    _pieceHeight = Math.floor(_img.height / PUZZLE_DIFFICULTY)
    _puzzleWidth = _pieceWidth * PUZZLE_DIFFICULTY;
    _puzzleHeight = _pieceHeight * PUZZLE_DIFFICULTY;
    setCanvas();
    initPuzzle();
}
function setCanvas(){
    _canvas = document.getElementById('canvas');
    _stage = _canvas.getContext('2d');
    
    _canvas.width = _puzzleWidth;
    _canvas.height = _puzzleHeight;
    _canvas.style.border = "1px solid black";
    
    //Set the #puzzleImageContainer height = the new image() clicked
    $("#puzzle").height(_puzzleHeight)
}
function initPuzzle(){
    _pieces = [];
    _mouse = {x:0,y:0};
    _currentPiece = null;
    _currentDropPiece = null;
    _stage.drawImage(_img, 0, 0, _puzzleWidth, _puzzleHeight, 0, 0, _puzzleWidth, _puzzleHeight);
    createTitle("Click to Start the Puzzle");
    buildPieces();
}
function createTitle(msg){
    _stage.fillStyle = "#3498db";   //Set the background of the button (black: "#000000")
    _stage.globalAlpha = .4;
    _stage.fillRect(100,_puzzleHeight - 40,_puzzleWidth - 200,40);
    _stage.fillStyle = "#2980b9";
    _stage.globalAlpha = 1;
    _stage.textAlign = "center";    // center the text at the middle of the text.box
    _stage.textBaseline = "middle"; // center the text at the middle of the base line
    _stage.font = "20px Arial";
    _stage.fillText(msg,_puzzleWidth / 2,_puzzleHeight - 20);
}
function buildPieces(){
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    for(i = 0;i < PUZZLE_DIFFICULTY * PUZZLE_DIFFICULTY;i++){
        piece = {};
        piece.sx = xPos;
        piece.sy = yPos;
        _pieces.push(piece);
        xPos += _pieceWidth;
        if(xPos >= _puzzleWidth){
            xPos = 0;
            yPos += _pieceHeight;
        }
    }
    //document.onmousedown = shufflePuzzle; //Start the puzzle by click
    _canvas.onmousedown = shufflePuzzle; //Start the puzzle by click')
}
function shufflePuzzle(){
    _pieces = shuffleArray(_pieces);
    _stage.clearRect(0,0,_puzzleWidth,_puzzleHeight);
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        piece.xPos = xPos;
        piece.yPos = yPos;
        _stage.drawImage(_img, piece.sx, piece.sy, _pieceWidth, _pieceHeight, xPos, yPos, _pieceWidth, _pieceHeight);
        _stage.strokeRect(xPos, yPos, _pieceWidth,_pieceHeight);
        xPos += _pieceWidth;
        if(xPos >= _puzzleWidth){
            xPos = 0;
            yPos += _pieceHeight;
        }
    }
    _canvas.onmousedown = onPuzzleClick; //Prevent reshuffle (@Override)
    counter(); //start counter after puzzling the picture(counter.js)
}
function onPuzzleClick(e){
    var rect = _canvas.getBoundingClientRect();
    _mouse.x = e.clientX - rect.left;
    _mouse.y = e.clientY - rect.top;
    _currentPiece = checkPieceClicked();
    if(_currentPiece != null){
        _stage.clearRect(_currentPiece.xPos,_currentPiece.yPos,_pieceWidth,_pieceHeight);
        _stage.save();
        _stage.globalAlpha = .9;
        _stage.drawImage(_img, _currentPiece.sx, _currentPiece.sy, _pieceWidth, _pieceHeight, _mouse.x - (_pieceWidth / 2), _mouse.y - (_pieceHeight / 2), _pieceWidth, _pieceHeight);
        _stage.restore();
        document.onmousemove = updatePuzzle;
        document.onmouseup = pieceDropped;
    }
}
function checkPieceClicked(){
    var i;
    var piece;
    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        if(_mouse.x < piece.xPos || _mouse.x > (piece.xPos + _pieceWidth) || _mouse.y < piece.yPos || _mouse.y > (piece.yPos + _pieceHeight)){
            //PIECE NOT HIT
        }
        else{
            return piece;
        }
    }
    return null;
}
function updatePuzzle(e){
    _currentDropPiece = null;
    var rect = _canvas.getBoundingClientRect();
    _mouse.x = e.clientX - rect.left;
    _mouse.y = e.clientY - rect.top;
    _stage.clearRect(0,0,_puzzleWidth,_puzzleHeight);
    var i;
    var piece;
    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        if(piece == _currentPiece){
            continue;
        }
        _stage.drawImage(_img, piece.sx, piece.sy, _pieceWidth, _pieceHeight, piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
        _stage.strokeRect(piece.xPos, piece.yPos, _pieceWidth,_pieceHeight);
        if(_currentDropPiece == null){
            if(_mouse.x < piece.xPos || _mouse.x > (piece.xPos + _pieceWidth) || _mouse.y < piece.yPos || _mouse.y > (piece.yPos + _pieceHeight)){
                //NOT OVER
            }
            else{
                _currentDropPiece = piece;
                _stage.save();
                _stage.globalAlpha = .4;
                _stage.fillStyle = PUZZLE_HOVER_TINT;
                _stage.fillRect(_currentDropPiece.xPos,_currentDropPiece.yPos,_pieceWidth, _pieceHeight);
                _stage.restore();
            }
        }
    }
    _stage.save();
    _stage.globalAlpha = .6;
    _stage.drawImage(_img, _currentPiece.sx, _currentPiece.sy, _pieceWidth, _pieceHeight, _mouse.x - (_pieceWidth / 2), _mouse.y - (_pieceHeight / 2), _pieceWidth, _pieceHeight);
    _stage.restore();
    _stage.strokeRect( _mouse.x - (_pieceWidth / 2), _mouse.y - (_pieceHeight / 2), _pieceWidth,_pieceHeight);
}
function pieceDropped(e){
    document.onmousemove = null;
    document.onmouseup = null;
    if(_currentDropPiece != null){
        var tmp = {xPos:_currentPiece.xPos,yPos:_currentPiece.yPos};
        _currentPiece.xPos = _currentDropPiece.xPos;
        _currentPiece.yPos = _currentDropPiece.yPos;
        _currentDropPiece.xPos = tmp.xPos;
        _currentDropPiece.yPos = tmp.yPos;
    }
    incementMovesDone();
    resetPuzzleAndCheckWin();
}
function resetPuzzleAndCheckWin(){
    _stage.clearRect(0,0,_puzzleWidth,_puzzleHeight);
    var gameWin = true;
    var i;
    var piece;
    for(i = 0;i < _pieces.length;i++){
        piece = _pieces[i];
        _stage.drawImage(_img, piece.sx, piece.sy, _pieceWidth, _pieceHeight, piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
        _stage.strokeRect(piece.xPos, piece.yPos, _pieceWidth,_pieceHeight);
        if(piece.xPos != piece.sx || piece.yPos != piece.sy){
            gameWin = false;
        }
    }
    if(gameWin){
        setTimeout(gameOver,500);
    }
}
function gameOver(){
    document.onmousedown = null;
    document.onmousemove = null;
    document.onmouseup = null;
    //initPuzzle(); //If the developer wants a specific random picture for puzzle next... 
    getTimeOnComplete(); //Collect the Score(sec.) and #puzzles done 
    hidePuzzle(); //Hide the puzzle (unable to press "redo")
    setIncrementPuzzleDone();
}
function shuffleArray(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
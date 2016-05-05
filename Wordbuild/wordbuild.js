//Color schem
var bgroundCol="#c9481d";
var bgroundRivet="#e6e64d";

//Determine game variables
var word = getWord();
var time = 300;
var animationtype= 'streaks'

//Set background
var canvas = document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
drawBackground()

//Set buffer
var buffer= document.createElement('canvas');
buffer.width=500;
buffer.height=300;
offctx=buffer.getContext('2d')
offctx.font = "120px Arial";
offctx.fillStyle="#3366ff";

//Draw word to buffer
var wordsize = offctx.measureText(word);
offctx.fillText(word, 0, 120)
var final_wordleftX = (canvas.width - wordsize.width)/2

drawFullText()

//Draws the ful text to it's final position in the screen
//used for debugging and experimenting
function drawFullText(){
	ctx.drawImage(buffer, startX , 100);
	
}
//Draws the button TODO

//Draw timer TODO

//Draws the background
function drawBackground(){
	ctx.beginPath();
	ctx.fillStyle=bgroundCol;
	ctx.rect(0,0,canvas.width,canvas.height)
	ctx.fill();
	ctx.closePath();
	

	ctx.beginPath();
	ctx.rect(10,10, canvas.width-20, canvas.height-20);
	ctx.strokeStyle=bgroundRivet;
	ctx.stroke();
	ctx.closePath();

}


//TODO loads the available words and randomly selects one
function getWord(){
	//TODO this function is supposed to load the words file and get a random one
	return "casa"
}
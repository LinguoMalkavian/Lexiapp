//Color scheme
//LexiGray: rgb(119,104,102)
//LexiPink: rgb(209,143,133)
//LexiDarkGrey: rgb(76,61,63)
var bgroundCol="rgb(22,107,84)"//"#339966";
var bgroundRivet="#ffb500"; //e6e64d
//TODO determine colors
var buttonUnpressedCol="#00ff80"
var buttonPressedCol="#339966"
var buttonOutlineCol= "#e6e64d"
var fontColor="#ffb500"
var microWidth = 30;
var microHeight = 50;


//Coordinates of stuff
var buttonCenterX=520;
var buttonCenterY=325;
var buttonRadius=40;

//Determine game variables
var word = getWord();
var time = 300;
var animationtype= 'blocks';
var wordspeed=2;

//Other useful global variables
var buttonPressed=false ;

//Initialize and set the Speech recognizer
//imports
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

//instancing and settings

var grammar = '#JSGF V1.0; grammar simple; public <word> = mamá | carro | caro | corra | kilo | caer;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'es-CO';
recognition.interimResults = false;
recognition.maxAlternatives = 5;

//Load files
var microImage=new Image();
// microImage.onload = function () {
//     ctx.drawImage(microImage, 300, 300);// this is line 14
// };
microImage.src='mic.png';

//Set background
var canvas = document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
 
//Set buffer
var buffer= document.createElement('canvas');
buffer.width=500;
buffer.height=120;
offctx=buffer.getContext('2d')

//experimental filing
//offctx.fillStyle="cyan"
//offctx.fillRect(0,0,buffer.width,buffer.height)
//Draw word to buffer
offctx.font = "120px Arial";
offctx.fillStyle=fontColor;
offctx.fillText(word, 0, 95)
var wordsize = offctx.measureText(word);


var final_wordleftX = (canvas.width - wordsize.width)/2
var final_wordY=130;

//Declare the slice class
function Slice(x,y,height,width){
	this.x=x;
	this.y=y;
	this.Height=height;
	this.Width=width;

}
Slice.prototype.draw = function(){
	ctx.drawImage(buffer,this.x,this.y,this.Width,this.Height,this.posX,this.posY,this.Width,this.Height)
}

//Initialize slices
if (animationtype=="streaks"){
	//Initialize slices
	sliceheight=buffer.height/4
	slicewidth=buffer.width
	slices=[]
	for(var i =0; i< 4;i++){
		x=0
		y=sliceheight*i;	
		theSlice=new Slice(x,y,sliceheight,slicewidth);
		theSlice.posY=y+final_wordY
		if(i%2==0){
			theSlice.posX=0-wordsize.width +50;
		}else{
			theSlice.posX=canvas.width;
		}
		slices.push(theSlice);

	}
}else{
	//Initialize slices
	var numcolumns=3;
	var numrows=2;
	var sliceHeight=(buffer.height/numrows);
	var sliceWidth=(buffer.width/numcolumns);
	slices=[]
	for(var r =1; r<= numrows;r++){
		row=[]
		y=buffer.height-sliceHeight*r;
		for(var c=0; c<numcolumns; c++){
			x=c*sliceWidth;
			theSlice=new Slice(x,y,sliceHeight,sliceWidth);
			theSlice.posY=0-sliceHeight;
			theSlice.posX=x+final_wordleftX
			theSlice.dy=0
			row.push(theSlice);
		}
		slices.push(row);

	}
}



//Refresher
function refresh(){
	ctx.clearRect(0,0,canvas.width,canvas.height)
	updatePositions();
	drawBackground();
	drawButton()
	drawElements();

}

//Drawers

//Draws the ful text to it's final position in the screen
//used for debugging and experimenting
function drawFullText(){
	ctx.drawImage(buffer, final_wordleftX  , 100);
	
}
//Draws the following frame of the animation (the states are updated by an independant function)
function drawElements(){
	if(animationtype=="streaks"){
		slices.forEach(
			function(elem){
				elem.draw()
		});
	}else{
		for(var r =0; r< numrows;r++){
			for(var c=0; c<numcolumns; c++)	{
				theSlice=slices[r][c]
				theSlice.draw();
				}
			}
		}
}
function updatePositions(){
	if(animationtype=="streaks"){
		for(var i =0; i< 4;i++){
			if(i%2==0){
				if(slices[i].posX <final_wordleftX){
					slices[i].posX+=wordspeed;
				}else{
					slices[i].posX=final_wordleftX
				}
			}else{
				if(slices[i].posX >final_wordleftX){
					slices[i].posX-=wordspeed;
				}else{
					slices[i].posX=final_wordleftX
				}
			}
		}
	}else{
		var mvtCol=Math.floor(Math.random()*numcolumns);
		var accell=false; 
		for(var r =0; r< numrows;r++){
			for(var c=0; c<numcolumns; c++)	{
				theSlice=slices[r][c]
				if(theSlice.posY>=final_wordY-theSlice.y){
					theSlice.posY=final_wordY+theSlice.y
					theSlice.dy=-1
				}else{
					if (!accell && c==mvtCol && theSlice.dy==0){
						theSlice.dy=2
						accell=true;
					}
					theSlice.posY+=theSlice.dy
				}
			}
			
		}
	}
}


//Draws the button TODO
function drawButton(){
	//Draw the center
	ctx.beginPath();
	if (buttonPressed){
		ctx.fillStyle=buttonPressedCol;
	}else{
		ctx.fillStyle=buttonUnpressedCol;
	}
	ctx.arc(buttonCenterX,buttonCenterY,buttonRadius ,0,Math.PI*2);
	ctx.fill();
	ctx.closePath();

	//Draw the outer line
	ctx.beginPath();
	ctx.arc(buttonCenterX,buttonCenterY,buttonRadius+2 ,0,Math.PI*2);
	ctx.lineWidth=8
	ctx.strokeStyle=buttonUnpressedCol;
	ctx.stroke()
	ctx.closePath();

	//Draw limit of the inner button
	ctx.beginPath();
	ctx.lineWidth=1
	ctx.arc(buttonCenterX,buttonCenterY,buttonRadius ,0,Math.PI*2);
	ctx.strokeStyle=buttonOutlineCol;
	ctx.stroke();
	ctx.closePath();
	//Draw the Icon
	
	ctx.drawImage(microImage,buttonCenterX-(microWidth/2),buttonCenterY-(microHeight/2),microWidth,microHeight);
	//TODO

}
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

//Utilities

//TODO loads the available words and randomly selects one
function getWord(){
	//TODO this function is supposed to load the words file and get a random one
	return "carro"
}

//I'm a mathematician so we now have a cartesian distance function, so what?
function distance(X1,Y1,X2,Y2){
	dist=Math.sqrt(Math.pow(X1-X2,2)+Math.pow(Y1-Y2,2));
	return dist;
}

document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);

function mouseDownHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY-canvas.offsetTop;
    if (distance(relativeX,relativeY,buttonCenterX,buttonCenterY)<=(buttonRadius+5)){
    	buttonPressed=true
    	recognition.start();
  		console.log('Ready to receive a word.');
    }

}
function mouseUpHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetUp;
    recognition.stop()
    buttonPressed=false
}

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at position 0.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object 
  console.log("It did stop")
  var answer = event.results[0][0].transcript;
  diagnostic.textContent = 'Result received: ' + answer + '.';
  console.log('Confidence: ' + event.results[0][0].confidence);
  if(result==word){
  	//To do, implement victory message
  		alert("Yes that's it champion");
  	}else{
  		alert("Sorry, that's not the word, are you dyslexic or something?")
  	}
  }

recognition.onnomatch = function(event) {
  console.log("Nope, not in grammar");
}

recognition.onerror = function(event) {
  console.log( 'Error occurred in recognition: ' + event.error);
}


// main call that keeps the game refreshing
setInterval(refresh,10)
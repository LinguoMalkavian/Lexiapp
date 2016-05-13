//Color scheme
//LexiGray: rgb(119,104,102)
//LexiPink: rgb(209,143,133)
//LexiDarkGrey: rgb(76,61,63)
var chronoCol="rgb(218,72,7)"
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
var timer = 0;
var fulltime=500;
var animationtype=setAnimationType();
var wordspeed=2;
var running=true;

//Other useful global variables
var buttonPressed=false ;
var victory=false;

//Initialize and set the Speech recognizer
//imports
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

// //instancing and settings

var grammar = "#JSGF V1.0; grammar simple; public <word> =la | va | ve | mi | hoy | doy | soy | pie | rey | bus | sal | luz | sed | miel | piel | fiel | pies | tren | flor | cruz | niño | mesa | carro | malo | todo | lápiz | pared | metál | árbol | antes"
var recognition = new SpeechRecognition();
recognition.lang = 'es-CO';
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;

recognition.interimResults = false;
recognition.maxAlternatives = 5;

//Load files
//Images
var microImage=new Image();
microImage.src='mic.png';
var chronoImage=new Image();
chronoImage.src='chrono.png';
var lexiLeft=new Image();
lexiLeft.src='lexiLeft.png'
var lexiRight=new Image();
lexiRight.src='lexiRight.png'
var lexiWait= new Image();
lexiWait.src= 'LexiWait.png'

//Lexidance
var finalAnim=false;
var dancingrate=40;
var frameCount=1;
var lexiSide=1

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
	var accum=0
	for(var i=0; i< 4;i++){
		x=0;
		if(i==0 || i==3){
			var thisSliceheight=sliceheight*1.50;	
		}else{
			var thisSliceheight=sliceheight*0.50;
		}
		y=accum;	
		theSlice=new Slice(x,y,thisSliceheight,slicewidth);
		theSlice.posY=y+final_wordY
		if(i%2==0){
			theSlice.posX=0-wordsize.width +50;
		}else{
			theSlice.posX=canvas.width;
		}
		accum+=thisSliceheight;
		slices.push(theSlice);

	}
}else{
	//Initialize slices
	var numcolumns=15;
	var numrows=5;
	var sliceHeight=(buffer.height/numrows);
	var sliceWidth=(buffer.width/numcolumns);
	slices=[]
	for(var r =1; r<= numrows;r++){
		row=[]
		y=buffer.height-sliceHeight*r;
		for(var c=0; c<numcolumns; c++){
			x=c*sliceWidth;
			theSlice=new Slice(x,y,sliceHeight,sliceWidth);
			theSlice.posY=0-sliceHeight*r;
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
	drawButton();
	drawElements();
	drawChrono();
	if(running){
		timer++;
		if (timer==fulltime){
			defeat();
			}
	}else if (victory){
		victoryAnimation();
	}else{
		defeatAnimation();
	}

	//drawFullText();
}

//Drawers

//Draws the ful text to it's final position in the screen
//used for debugging and experimenting
function drawFullText(){
	ctx.drawImage(buffer, final_wordleftX  , final_wordY);
	
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
				if(theSlice.posY>=final_wordY+theSlice.y){
					theSlice.posY=final_wordY+theSlice.y
					theSlice.dy=-1
				}else{
					if(!accell && c==mvtCol && theSlice.dy==0){
						theSlice.dy=1
						accell=true;
					}else if(theSlice.dy!=0){
						theSlice.dy+=0.1
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
	ctx.lineWidth=3
	ctx.rect(10,10, canvas.width-20, canvas.height-20);
	ctx.strokeStyle=bgroundRivet;
	ctx.stroke();
	ctx.closePath();
}

//Draws the timer
function drawChrono(){
	
	chronoWidth=chronoImage.width/20;
	chronoHeight=chronoImage.height/20;
	chronoX=buttonCenterX-(chronoWidth/2)
	chronoY=25
	chronoCenterX=chronoX+ chronoWidth/2
	chronoCenterY=chronoY+ chronoHeight/2 +6
	ctx.drawImage(chronoImage,chronoX,chronoY,chronoWidth,chronoHeight)
	//Calculate the position hof the hand
	theta=((Math.PI*2*timer)/fulltime)-Math.PI/2;
	r=20
	handX=chronoCenterX+r*Math.cos(theta);
	handY=chronoCenterY+r*Math.sin(theta);
	ctx.beginPath();
	ctx.lineWidth=2
	ctx.strokeStyle=chronoCol;
	ctx.moveTo(chronoCenterX,chronoCenterY);
	ctx.lineTo(handX,handY);
	ctx.stroke();
	ctx.closePath();
}

//Draws the defeat sequence and then restarts
function defeat(){
	running=false
}

function victory(){
	running=false;
	victory=true;

}

function victoryAnimation(){
	lexiWidth=lexiLeft.width/10
	lexiHeight=lexiLeft.height/10
	lexiPosX=(canvas.width/2)-(lexiWidth/2)
	lexiPosY=(canvas.height/2)-(lexiHeight/2)

	if (frameCount%dancingrate==0){
		lexiSide=-lexiSide;
	}
	if (lexiSide==1){
		ctx.drawImage(lexiLeft,lexiPosX,lexiPosY,lexiWidth,lexiHeight);
		frameCount++;
	}else{
		ctx.drawImage(lexiRight,lexiPosX,lexiPosY,lexiWidth,lexiHeight);
		frameCount++
	}
}

function defeatAnimation(){
	lexiWaitWidth=lexiWait.width/10
	lexiWaitHeight=lexiWait.height/10
	lexiWaitPosX=(canvas.width/2)-(lexiWaitWidth/2)
	lexiWaitPosY=(canvas.height/2)-(lexiWaitHeight/2)

	ctx.drawImage(lexiWait,lexiWaitPosX,lexiWaitPosY,lexiWaitWidth,lexiWaitHeight);
	

}

//Utilities

//TODO loads the available words and randomly selects one
function getWord(){
	//TODO this function is supposed to load the words file and get a random one
	wordlist=['la','va','ve','mi','hoy','doy','soy','pie','rey','bus','sal','luz','sed','miel','piel','fiel','pies','tren','flor','cruz','niño','mesa','carro','malo','todo','lápiz','pared','metál','árbol','antes']	
	opt=wordlist.length;
	choice=Math.floor(Math.random()*opt);
	return wordlist[choice];
}

function setAnimationType(){
	var die=Math.floor(Math.random()*10)
	if (die%2==0){
		animationtype="streaks";
	}else{
		animationtype="blocks";
	}
	return animationtype;
	
}
//I'm a mathematician so we now have a cartesian distance function, so what?
function distance(X1,Y1,X2,Y2){
	dist=Math.sqrt(Math.pow(X1-X2,2)+Math.pow(Y1-Y2,2));
	return dist;
}

//Event handlers
document.addEventListener("click", mouseClickHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);

function mouseClickHandler(e){
	console.log("You clicked?")
	if (!running){
		document.location.reload();
	}
}

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
  console.log("It did stop");
  var answer = event.results[0][0].transcript;
  var altanswer="";
  if (event.results.len>1){
  	 altanswer=event.results[1][0].transcript;
  }
  console.log( 'Result received: ' + answer + '.');
  console.log('Confidence: ' + event.results[0][0].confidence);
  if(answer==word || altanswer==word){
  	//To do, implement victory message
  		victory();

  	}else{
  		alert("Lo siento esa no es la palabra correcta")
  		//running=true
  		timer+=50
  	}
  }

recognition.onnomatch = function(event) {
  console.log("Nope, not in grammar");
}

recognition.onerror = function(event) {
  console.log( 'Error occurred in recognition: ' + event.error);
}


// main call that keeps the game refreshing
setInterval(refresh,10);
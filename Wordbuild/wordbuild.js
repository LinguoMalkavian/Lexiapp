//Color scheme
var bgroundCol="#c9481d";
var bgroundRivet="#e6e64d";
//TODO determine colors
var buttonUnpressedCol="#32cf32"
var buttonPressedCol="#327332"
var fontColor="#3366ff"


//Coordinates of stuff
var buttonCenterX=520;
var buttonCenterY=325;
var buttonRadius=40;

//Determine game variables
var word = getWord();
var time = 300;
var animationtype= 'streaks'
var wordspeed=2;

//Other useful global variables
buttonPressed=false 

//Load files
var microImage=new Image();
microImage.onload = function () {
    ctx.drawImage(img, 300, 300);// this is line 14
    alert("It's there look at the Motherfucker")
};
microImage.src='micro.png';

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
sliceheight=buffer.height/4
slicewidth=buffer.width
slices=[]
for(var i =0; i< 4;i++){
	x=0
	y=sliceheight*i;	
	theSlice=new Slice(x,y,sliceheight,slicewidth);
	theSlice.posY=y+130
	if(i%2==0){
		theSlice.posX=0-wordsize.width +50;
	}else{
		theSlice.posX=canvas.width;
	}
	slices.push(theSlice);

}

drawElements();


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
	slices.forEach(
		function(elem){
			elem.draw()
	});
}
function updatePositions(){
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
	ctx.strokeStyle="black";
	ctx.stroke();
	ctx.closePath();
	//Draw the Icon
	
	//ctx.drawImage(microImage,buttonCenterX,buttonCenterY);
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
	return "fingiré"
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
    	
    }

}
function mouseUpHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetUp;
    buttonPressed=false
}
// main call that keeps the game refreshing
setInterval(refresh,10)
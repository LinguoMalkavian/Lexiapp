var word = getWord();
var canvas = document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
drawBackground()

var buffer= document.createElement('canvas');
buffer.width=500;
buffer.height=300;
offctx=buffer.getContext('2d')
offctx.font = "120px Arial";
offctx.fillStyle="#3366ff";
var wordsize = offctx.measureText(word);
var wordheight= wordsize.actualBoundingBoxAscent
offctx.fillText(word, 0, 120)

var startX = (canvas.width - wordsize.width)/2

drawFullText()

function drawFullText(){
	ctx.drawImage(buffer, startX , 100);
	
}

function drawBackground(){
	ctx.beginPath();
	ctx.fillStyle="#c9481d";
	ctx.rect(0,0,canvas.width,canvas.height)
	ctx.fill();
	ctx.closePath();
	

	ctx.beginPath();
	ctx.rect(10,10, canvas.width-20, canvas.height-20);
	ctx.strokeStyle="#e6e64d";
	ctx.stroke();
	ctx.closePath();

}

function getWord(){
	//TODO this function is supposed to load the words file and get a random one
	return "casa"
}
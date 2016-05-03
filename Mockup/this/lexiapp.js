var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Images
var lexi_profile = new Image();
lexi_profile.src = "LexiProfileView.png";
var settings_pic = new Image();
settings_pic.src = "settings.png";
var graph_pic = new Image();
graph_pic.src = "graph.jpg";

var mode = 1;

var dark_green = false;

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

canvas.addEventListener("mousedown", doMouseDown, false);
canvas.addEventListener("mouseup", doMouseUp, false);
function doMouseDown(event) {
	var pos = getMousePos(canvas, event);
    var mx = pos.x;
    var my = pos.y;
    if (mode == 1) {
    	if (mx >= canvas.width/6 && mx <= canvas.width/6+(canvas.width-canvas.width/3) && my >= canvas.height/3 && my <= canvas.height/3+canvas.height/3) {
    		dark_green = true;
    	} else {
    		dark_green = false;
    	}
    }
}

function doMouseUp(event) {
	var pos = getMousePos(canvas, event);
    var mx = pos.x;
    var my = pos.y;var pos = getMousePos(canvas, event);
    var mx = pos.x;
    var my = pos.y;
    if (mode == 1) {
    	if (mx >= canvas.width/6 && mx <= canvas.width/6+(canvas.width-canvas.width/3) && my >= canvas.height/3 && my <= canvas.height/3+canvas.height/3) {

    	}
    	dark_green = false;
    }
}

function homeScreen() {
	//Title text
	ctx.textAlign = "center";
	ctx.font = "bold 40px Arial";
	ctx.fillStyle = "Yellow";
	ctx.fillText("LEXIAPP", canvas.width/2, canvas.height/5);
	//Play button
	ctx.beginPath();
	ctx.lineWidth = "10";
	ctx.strokeStyle = "Green";
	ctx.rect(canvas.width/6, canvas.height/3, canvas.width-canvas.width/3, canvas.height/3);
	if (dark_green) {
		ctx.fillStyle = "DarkGreen";
	} else {
		ctx.fillStyle = "LightGreen";
	}
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	//Play text and image
	ctx.font = "bold 50px Verdana";
	ctx.fillStyle = "MidnightBlue";
	ctx.fillText("Jugar", canvas.width/2, canvas.height/2+23);
	ctx.drawImage(lexi_profile, canvas.width/2-30, canvas.height/3+20, 59, 80);
	//Stats button
	ctx.beginPath();
	ctx.lineWidth = "5";
	ctx.strokeStyle = "Yellow";
	ctx.rect(canvas.width/6, canvas.height-canvas.height/5, canvas.width/4, canvas.height/8);
	ctx.fillStyle = "LightYellow";
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	//Stats text and image
	ctx.font = "bold 15px Verdana";
	ctx.fillStyle = "MidnightBlue";
	ctx.fillText("Puntaje", canvas.width/6+canvas.width/8, canvas.height-canvas.height/5+canvas.height/16);
	ctx.drawImage(graph_pic, canvas.width/6+canvas.width/8-15, canvas.height-canvas.height/8, 30, 30);
	//Settings button
	ctx.beginPath();
	ctx.lineWidth = "5";
	ctx.strokeStyle = "Yellow";
	ctx.rect(canvas.width-canvas.width/6-canvas.width/4, canvas.height-canvas.height/5, canvas.width/4, canvas.height/8);
	ctx.fillStyle = "LightYellow";
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	//Settings text and image
	ctx.font = "bold 15px Verdana";
	ctx.fillStyle = "MidnightBlue";
	ctx.fillText("Opciones", canvas.width-canvas.width/6-canvas.width/4+canvas.width/8, canvas.height-canvas.height/5+canvas.height/16);
	ctx.drawImage(settings_pic, canvas.width-canvas.width/6-canvas.width/4+canvas.width/8-10, canvas.height-canvas.height/8, 20, 20);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	switch(mode) {
		case 1:
			homeScreen();
			break;
	}
}

setInterval(draw, 10);
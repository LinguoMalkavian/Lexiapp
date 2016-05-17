var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); 

var mode = 1;
var dark_green = false;

var lexi_x = 0;
var lexi_y = canvas.height-40;

var timer = 0;
var fulltime=1500;

var dancingrate=40;
var frameCount=1;
var lexiSide=1;

var chronoImage=new Image();
chronoImage.src='chrono.png';
var chronoCol="rgb(218,72,7)";

var sadLexi = new Image();
sadLexi.src = "sadLexi.png";

var lexiLeft = new Image();
lexiLeft.src = "lexiLeft.png";
var lexiRight = new Image();
lexiRight.src = "lexiRight.png";

var lexi_right = new Image();
lexi_right.src = "lexi_run_r.png";
var lexi_left = new Image();
lexi_left.src = "lexi_run_l.png";
var lexi_down = new Image();
lexi_down.src = "lexi_run_d.png";
var lexi_up = new Image();
lexi_up.src = "lexi_run_u.png";

var speaker = new Image();
speaker.src = "speaker.png";
var refresh_icon = new Image();
refresh_icon.src = "refresh.png";

var words = ["soy", "pies", "tren", "flor", "cruz", "mesa", "carro", "todo", "pared", "antes"];

var boarder_w = 10;
var margin_w = 80;

var right_press = false;
var left_press = false;
var up_press = false;
var down_press = false;

var move = false;
var direction = 0;
var prev_dir = 0;

// http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

shuffle(words);
switch(words[0]) {
	case "soy":
		snd = new Audio("soy.wav");
		break;
	case "pies":
		snd = new Audio("pies.wav");
		break;
	case "tren":
		snd = new Audio("tren.wav");
		break;
	case "flor":
		snd = new Audio("flor.wav");
		break;
	case "cruz":
		snd = new Audio("cruz.wav");
		break;
	case "mesa":
		snd = new Audio("mesa.wav");
		break;
	case "carro":
		snd = new Audio("carro.wav");
		break;
	case "todo":
		snd = new Audio("todo.wav");
		break;
	case "pared":
		snd = new Audio("pared.wav");
		break;
	case "antes":
		snd = new Audio("antes.wav");
		break;
}

snd.play()

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
	if (mx >= canvas.width-70 && mx <= canvas.width-10 && my >= canvas.height - 75 && my <= canvas.height - 15) {
		dark_green = true;
	} else {
		dark_green = false;
	}
}

function doMouseUp(event) {
	var pos = getMousePos(canvas, event);
    var mx = pos.x;
    var my = pos.y;
    if (mx >= canvas.width-70 && mx <= canvas.width-10 && my >= canvas.height - 75 && my <= canvas.height - 15) {
    	if (mode == 1) {
    		snd.play();
    	}
    	else if (mode == 2 || mode == 3) {
    		mode = 1;
    		reset_all();
    		snd.play();
    	}
    }
    dark_green = false;
}

document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
    // right arrow
    if (e.keyCode == 39) {
    	if (direction != 2 && direction != 1 && move == false) {
    		move = true;
    		prev_dir = direction;
	        right_press = true;
	        left_press = false;
	        up_press = false;
	        down_press = false;
	        direction = 1;
	    }
    }
    // left arrow
    else if (e.keyCode == 37) {
    	if (direction != 1 && direction != 2 && move == false) {
    		move = true;
    		prev_dir = direction;
	        right_press = false;
	        left_press = true;
	        up_press = false;
	        down_press = false;
	        direction = 2;
	    }
    }
    // up arrow
    else if (e.keyCode == 38) {
    	if (direction != 4 && direction != 3 && move == false) {
    		move = true;
    		prev_dir = direction;
	        right_press = false;
	        left_press = false;
	        up_press = true;
	        down_press = false;
	        direction = 3;
	    }
    }
    // down arrow
    else if (e.keyCode == 40) {
    	if (direction != 3 && direction != 4 && move == false) {
    		move = true;
    		prev_dir = direction;
	        right_press = false;
	        left_press = false;
	        up_press = false;
	        down_press = true;
	        direction = 4;
	    }
    }
}

function reset_all() {
	mode = 1;
	dark_green = false;

	lexi_x = 0;
	lexi_y = canvas.height-40;

	timer = 0;

	maze_mode = Math.floor(Math.random() * 4);

	switch(maze_mode) {
		case 0:
			b1.change(0, 150, 150, 100);
			b2.change(250, 300, 100, 100);
			b3.change(200, 150, 100, 50);
			b4.change(250, 0, 50, 50);
			b5.change(420, 100, 50, 200);
			break;
		case 1:
			b1.change(0, 150, 150, 50);
			b2.change(250, 300, 50, 100);
			b3.change(200, 200, 100, 50);
			b4.change(250, 0, 25, 50);
			b5.change(420, 150, 100, 50);
			break;
		case 2:
			b1.change(0, 200, 150, 50);
			b2.change(250, 200, 50, 200);
			b3.change(250, 200, 100, 50);
			b4.change(300, 0, 25, 50);
			b5.change(420, 150, 100, 50);
			break;
	}

	move = false;
	direction = 0;
	prev_dir = 0;

	place = Math.floor(Math.random() * 3);

	shuffle(words);
	switch(words[0]) {
		case "soy":
			snd = new Audio("soy.ogg");
			break;
		case "pies":
			snd = new Audio("pies.ogg");
			break;
		case "tren":
			snd = new Audio("tren.ogg");
			break;
		case "flor":
			snd = new Audio("flor.ogg");
			break;
		case "cruz":
			snd = new Audio("cruz.ogg");
			break;
		case "mesa":
			snd = new Audio("mesa.ogg");
			break;
		case "carro":
			snd = new Audio("carro.ogg");
			break;
		case "todo":
			snd = new Audio("todo.ogg");
			break;
		case "pared":
			snd = new Audio("pared.ogg");
			break;
		case "antes":
			snd = new Audio("antes.ogg");
			break;
	}
	ctx.drawImage(lexi_right, lexi_x, lexi_y, 47, 27)
}

function draw_lexi() {
	switch(direction) {
		case 0:
			ctx.drawImage(lexi_right, lexi_x, lexi_y, 47, 27);
			break;
		case 1:
			if (prev_dir != 2) {
				ctx.drawImage(lexi_right, lexi_x, lexi_y, 47, 27);
			}
			else {
				ctx.drawImage(lexi_left, lexi_x, lexi_y, 47, 27);
			}
			break;
		case 2:
			if (prev_dir != 1) {
				ctx.drawImage(lexi_left, lexi_x, lexi_y, 47, 27);
			}
			else {
				ctx.drawImage(lexi_right, lexi_x, lexi_y, 47, 27);
			}
			break;
		case 3:
			if (prev_dir != 4) {
				ctx.drawImage(lexi_up, lexi_x, lexi_y, 27, 47);
			}
			else {
				ctx.drawImage(lexi_down, lexi_x, lexi_y, 27, 47);
			}
			break;
		case 4:
			if (prev_dir != 3) {
				ctx.drawImage(lexi_down, lexi_x, lexi_y, 27, 47);
			}
			else {
				ctx.drawImage(lexi_up, lexi_x, lexi_y, 27, 47);
			}
			break;
	}
	if (right_press && lexi_x <= canvas.width-boarder_w-47-margin_w && prev_dir != 2 && move) {
		lexi_x += 2;
	}
	else if (left_press && lexi_x >= boarder_w && prev_dir != 1 && move) {
		lexi_x -= 2;
	}
	else if (up_press && lexi_y >= boarder_w && prev_dir != 4 && move) {
		lexi_y -= 2;
	}
	else if (down_press && lexi_y <= canvas.height-boarder_w-47 && prev_dir != 3 && move) {
		lexi_y += 2;
	}
	else {
		move = false;
	}
	switch(place) {
		case 0:
			if (lexi_x < 80 && lexi_x > 0 && lexi_y < 40 && lexi_y > 0) {
				mode = 2;
			}
			else if (lexi_x + 27 > canvas.width-boarder_w-margin_w-80 && lexi_x < canvas.width-boarder_w-margin_w && lexi_y < 40 && lexi_y > 0) {
				mode = 3;
			}
			else if (lexi_x + 27 > canvas.width-boarder_w-margin_w-80 && lexi_x < canvas.width-boarder_w-margin_w && lexi_y < canvas.height && lexi_y + 27 > canvas.height - 40 - boarder_w) {
				mode = 3;
			}
			break;
		case 1:
			if (lexi_x < 80 && lexi_x > 0 && lexi_y < 40 && lexi_y > 0) {
				mode = 3;
			}
			else if (lexi_x + 27 > canvas.width-boarder_w-margin_w-80 && lexi_x < canvas.width-boarder_w-margin_w && lexi_y < 40 && lexi_y > 0) {
				mode = 2;
			}
			else if (lexi_x + 27 > canvas.width-boarder_w-margin_w-80 && lexi_x < canvas.width-boarder_w-margin_w && lexi_y < canvas.height && lexi_y + 27 > canvas.height - 40 - boarder_w) {
				mode = 3;
			}
			break;
		case 2:
			if (lexi_x < 80 && lexi_x > 0 && lexi_y < 40 && lexi_y > 0) {
				mode = 3;
			}
			else if (lexi_x + 27 > canvas.width-boarder_w-margin_w-80 && lexi_x < canvas.width-boarder_w-margin_w && lexi_y < 40 && lexi_y > 0) {
				mode = 3;
			}
			else if (lexi_x + 27 > canvas.width-boarder_w-margin_w-80 && lexi_x < canvas.width-boarder_w-margin_w && lexi_y < canvas.height && lexi_y + 27 > canvas.height - 40 - boarder_w) {
				mode = 2;
			}
			break;
	}
}

function Block (x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.colDetect = function() {
		// side of block detection
		if (lexi_x + 47 > this.x && lexi_x - 2 < this.x + this.w && lexi_y + 30 > this.y && lexi_y < this.y + this.h - 10) {
			right_press = false;
			left_press = false;
		}
		// floor/ceiling of block detection
		if (lexi_x + 13 > this.x && lexi_x < this.x + this.w && lexi_y + 47 > this.y && lexi_y < this.y + this.h) {
			up_press = false;
			down_press = false;
		}
	};

	this.change = function(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	this.draw = function() {
		ctx.fillStyle = "FireBrick";
		this.colDetect();
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.w, this.h);
		ctx.fill();
		ctx.closePath();
	};
}

//Draws the timer
function drawChrono() {
	chronoWidth=chronoImage.width/30;
	chronoHeight=chronoImage.height/30;
	chronoX=canvas.width-65;
	chronoY=25;
	chronoCenterX=chronoX+ chronoWidth/2;
	chronoCenterY=chronoY+ chronoHeight/2 + 6;
	ctx.drawImage(chronoImage,chronoX,chronoY,chronoWidth,chronoHeight);
	//Calculate the position half the hand
	theta=((Math.PI*2*timer)/fulltime)-Math.PI/2;
	r=20;
	handX=chronoCenterX+r*Math.cos(theta);
	handY=chronoCenterY+r*Math.sin(theta);
	ctx.beginPath();
	ctx.lineWidth=2;
	ctx.strokeStyle=chronoCol;
	ctx.moveTo(chronoCenterX,chronoCenterY);
	ctx.lineTo(handX,handY);
	ctx.stroke();
	ctx.closePath();
}

var maze_mode = Math.floor(Math.random() * 4);

var b1 = new Block(0, 150, 150, 100);
var b2 = new Block(250, 300, 100, 100);
var b3 = new Block(200, 150, 100, 50);
var b4 = new Block(250, 0, 50, 50);
var b5 = new Block(420, 100, 50, 200);

switch(maze_mode) {
	case 0:
		b1.change(0, 150, 150, 100);
		b2.change(250, 300, 100, 100);
		b3.change(200, 150, 100, 50);
		b4.change(250, 0, 50, 50);
		b5.change(420, 100, 50, 200);
		break;
	case 1:
		b1.change(0, 150, 150, 50);
		b2.change(250, 300, 50, 100);
		b3.change(200, 200, 100, 50);
		b4.change(250, 0, 25, 50);
		b5.change(420, 150, 100, 50);
		break;
	case 2:
		b1.change(0, 200, 150, 50);
		b2.change(250, 200, 50, 200);
		b3.change(250, 200, 100, 50);
		b4.change(300, 0, 25, 50);
		b5.change(420, 150, 100, 50);
		break;
}

function draw_boarders() {
	ctx.fillStyle = "FireBrick";
	ctx.beginPath();
    ctx.rect(0, 0, boarder_w, canvas.height);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(canvas.width-boarder_w-margin_w, 0, boarder_w, canvas.height);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, boarder_w);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(0, canvas.height-boarder_w, canvas.width, boarder_w);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "#87CEFA";
    ctx.beginPath();
    ctx.rect(canvas.width-margin_w, 0, margin_w, canvas.height);
    ctx.fill();
    ctx.closePath();
}

var place = Math.floor(Math.random() * 3);

function gamePlay() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	globalAlpha = 1;
    draw_boarders();
    ctx.beginPath();
    ctx.arc(canvas.width-40, canvas.height-45, 30, 0, Math.PI*2);
    if (dark_green) {
		ctx.fillStyle = "DarkGreen";
	} else {
		ctx.fillStyle = "Green";
	}
	ctx.fill();
	ctx.closePath();
	ctx.drawImage(speaker, canvas.width-55, canvas.height-60, 30, 30);
	draw_lexi();
	ctx.fillStyle = "FireBrick";
    b1.draw();
    b2.draw();
    b3.draw();
    b4.draw();
    b5.draw();
    ctx.beginPath();
    ctx.fill();
    ctx.closePath();
    ctx.textAlign = "start";
    ctx.fillStyle = "Black";
    ctx.font = "bold 20px Verdana";
    switch(place) {
    	case 0:
    		ctx.fillText(words[0], 20, 30);
    		ctx.fillText(words[1], 445, 30);
    		ctx.fillText(words[2], 445, 375);
    		break;
    	case 1:
    		ctx.fillText(words[1], 20, 30);
    		ctx.fillText(words[0], 445, 30);
    		ctx.fillText(words[2], 445, 375);
    		break;
    	case 2:
    		ctx.fillText(words[2], 20, 30);
    		ctx.fillText(words[1], 445, 30);
    		ctx.fillText(words[0], 445, 375);
    		break;
    }
    drawChrono();
    if (timer <= fulltime) {
    	timer ++;
    }
    else {
    	mode = 3;
    }
}

function winScreen() {
	lexiWidth=lexiLeft.width/10;
	lexiHeight=lexiLeft.height/10 - 25;
	lexiPosX=(canvas.width/2)-(lexiWidth/2);
	lexiPosY=(canvas.height/2)-(lexiHeight/2);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_boarders();
    b1.draw();
    b2.draw();
    b3.draw();
    b4.draw();
    b5.draw();
    ctx.beginPath();
    ctx.fillStyle = "White";
    ctx.globalAlpha = 0.5;
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.closePath();
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(canvas.width-40, canvas.height-45, 30, 0, Math.PI*2);
    if (dark_green) {
		ctx.fillStyle = "DarkGreen";
	} else {
		ctx.fillStyle = "Green";
	}
	ctx.fill();
	ctx.closePath();
	ctx.drawImage(refresh_icon, canvas.width-73, canvas.height-75, 70, 60);
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
	ctx.font = "bold 40px Verdana";
    ctx.textAlign = "center";
    ctx.fillStyle = "Black";
    ctx.fillText(words[0], canvas.width/2, 300);
}

function loseScreen() {
	sadLexiWidth=sadLexi.width/10;
	sadLexiHeight=sadLexi.height/10;
	sadLexiPosX=(canvas.width/2)-(sadLexiWidth/2);
	sadLexiPosY=(canvas.height/2)-(sadLexiHeight/2)-25;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_boarders();
    b1.draw();
    b2.draw();
    b3.draw();
    b4.draw();
    b5.draw();
    ctx.beginPath();
    ctx.fillStyle = "White";
    ctx.globalAlpha = 0.5;
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.closePath();
    ctx.globalAlpha = 1;
    ctx.font = "bold 40px Verdana";
    ctx.textAlign = "center";
    ctx.fillStyle = "Black";
    ctx.fillText(words[0], canvas.width/2, 300);
    ctx.drawImage(sadLexi, sadLexiPosX, sadLexiPosY, sadLexiWidth, sadLexiHeight);
    ctx.beginPath();
    ctx.arc(canvas.width-40, canvas.height-45, 30, 0, Math.PI*2);
    if (dark_green) {
		ctx.fillStyle = "DarkGreen";
	} else {
		ctx.fillStyle = "Green";
	}
	ctx.fill();
	ctx.closePath();
	ctx.drawImage(refresh_icon, canvas.width-73, canvas.height-75, 70, 60);
}

function draw() {
	switch(mode) {
		case 1:
			gamePlay();
			break;
		case 2:
			winScreen();
			break;
		case 3:
			loseScreen();
			break;
	}
    
}

setInterval(draw, 10);
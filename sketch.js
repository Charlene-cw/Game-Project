//background
var trees_x;
var clouds;
var mountains;
var canyons;
var collectable;
var platforms = [];
var onPlatform = false;
var flagpole

var score;
var lives;
var gameOver;
var win;
var sound;
var gameStarted = false;

var cameraPosX

var gameChar_x;
var gameChar_y;
var floorPos_y;
var enemies = [];

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var restartButton;
var level = 1;
var maxLevel = 3;

function preload() {
	soundFormats('mp3', 'wav');
	bgMusic = loadSound('assets/Background.mp3'); //background music
	bgMusic.setVolume(0.1);
	jumpM = loadSound('assets/Jump.mp3');
	jumpM.setVolume(0.1);
	collectablesM = loadSound('assets/Collectables.wav');
	collectablesM.setVolume(0.1);
	canyonM = loadSound('assets/Canyon.wav');
	canyonM.setVolume(0.01);
}

function setup() {
	createCanvas(1024, 576);
	//background
	trees_x = [0 - 700, 0 - 200, 800, 1024 + 200];

	//game character interaction
	floorPos_y = height * 3 / 4 - 5;
	gameChar_x = width / 2;
	gameChar_y = floorPos_y - 5;

	//Platform
	platforms.push(Platform(0, floorPos_y - 50, 90, 10));
	platforms.push(Platform(600, floorPos_y - 50, 90, 10));

	//Flagepole
	flagpole = { x: 1800, isReached: false };

	cameraPosX = 0

	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	//clouds
	clouds = [
		{ x: 0 - 200, y: 100, s: 80 },
		{ x: 900, y: 110, s: 80 },
		{ x: 330, y: 140, s: 80 }
	];
	//mountains
	mountains = [
		{ x: 530, y: 150 },
		{ x: 1400, y: 150 },
		{ x: 0, y: 150 }
	];
	//canyons
	canyons = [
		{ x: 140, width: 100 },
		{ x: 740, width: 100 },
		{ x: 0 - 400, width: 100 },
		{ x: 1400, width: 100 },
	];
	//collectables
	collectables = [
		{ x: random(-450, 0), y: floorPos_y - 20, size: 15, isFound: false }, //20
		{ x: random(200, 400), y: floorPos_y - 20, size: 15, isFound: false }, //200
		{ x: random(700, 900), y: floorPos_y - 20, size: 15, isFound: false } //700
	];

	score = 0;
	lives = 3;
	gameOver = false
	win = false
	restartGame();
}

function draw() {
	//Game start
	if (!gameStarted) {
		background(255, 192, 203);
		fill(255);
		stroke(255);
		strokeWeight(3);
		textSize(55);
		textAlign(CENTER, CENTER);
		textFont('Poppins');
		text("Press 'S' to Start", width / 2, height / 2);
		fill(173, 216, 230);
		textSize(25);
		stroke(173, 216, 230);
		strokeWeight(1);
		text("Use the left and right arrows to move and space/up arrow to jump.", width / 2, height / 2 + 70);
		text("Collect the 3 collectables before using up all 3 lives to move on to the next level.", width / 2, height / 2 + 100);
		text('Complete all 3 levels and reach the flagpole at level 3 to win!', width / 2, height / 2 + 130)
		return; // Stop execution if game not started
	}

	//Win
	if (win) {
		fill(0, 255, 0);
		stroke(0, 255, 0);
		strokeWeight(5);
		textSize(70);
		textAlign(CENTER, CENTER);
		text('WIN!', width / 2, height / 2);
		bgMusic.stop();
		createRestartButton();

		return;
	}

	if (score == 3) {
		if (level < maxLevel) {
			level++;  // Move to next level
			restartGame();
		}
		else if (abs(gameChar_x - flagpole.x) < 20) {
			flagpole.isReached = true;
			win = true;  // Game is won only when the character reaches the flagpole
		}
	}

	cameraPosX = gameChar_x - width / 2
	drawScene();
	//Implement scrolling
	push();
	translate(-cameraPosX, 0)

	//Background
	for (var i = 0; i < trees_x.length; i++) {
		var treeX = trees_x[i];
		drawTree(treeX);
	}

	for (var i = 0; i < clouds.length; i++) {
		var cloud = clouds[i];
		drawCloud(cloud.x, cloud.y, cloud.s);
		cloud.x += 0.6;
		if (cloud.x > width + cloud.s) {
			cloud.x = -cloud.s
		}
	}

	for (var i = 0; i < mountains.length; i++) {
		var mountain = mountains[i];
		drawMountain(mountain.x, mountain.y);
	}
	//canyon
	drawCanyons();
	checkIfGameCharIsOverAnyCanyons();

	//check if collectable is collected
	for (var i = 0; i < collectables.length; i++) {
		if (collectables[i].isFound == false) {
			if (dist(gameChar_x, gameChar_y, collectables[i].x, collectables[i].y) < 30) {
				collectables[i].isFound = true;
				score += 1;
				collectablesM.play();
			}
		}
	}
	drawCollectables();

	//Platforms
	for (let platform of platforms) {
		platform.display();
	}

	for (let platform of platforms) {
		if (platform.checkCollision(gameChar_x, gameChar_y)) {
			onPlatform = true;
			gameChar_y = platform.y - 5;
			break;
		}
	}

	//Flagpole
	drawFlagpole(flagpole);

	//GC interaction
	if (isLeft && isFalling) {        //jumping left
		drawGCisLeftandisFalling();
	}
	else if (isRight && isFalling) {  //jumping right
		drawGCisRightandisFalling();
	}
	else if (isLeft) {
		drawGCisLeft();
	}
	else if (isRight) {
		drawGCisRight();
	}
	else if (isFalling || isPlummeting) {    //jumping facing forward
		gameChar_y += 3;
		drawGCisFallingOrisPlummeting();
	}
	else {
		drawGCstandingFront();
	}

	//Enemies
	for (let enemy of enemies) {
		enemy.update();
		enemy.display();
		enemy.checkCollision(gameChar_x, gameChar_y);
	};

	pop();

	if (gameChar_y < floorPos_y) {
		gameChar_y += 3;   //apply gravity
		isFalling = true
	}
	else {
		isFalling = false;
	}

	if (isPlummeting == true) {
		isRight = false;
		isLeft = false;

		if (gameChar_y > height) {
			if (lives > 0) {
				lives--;
				restartGame();
			}
		}
	}

	if (isLeft == true) {
		gameChar_x -= 10;
	}
	else if (isRight == true) {
		gameChar_x += 10;
	}

	//Score
	fill(255);
	textSize(32);
	textAlign(RIGHT, TOP);
	text("Score: " + score, width - 20, 20);

	//Lives 
	for (let i = 0; i < 3; i++) {
		let isFilled = i < lives; // Pink if life remains, white if lost
		drawHeart(50 + i * 40, 50, isFilled);
	}
	//Levels 
	fill(255);
	textSize(32);
	textAlign(LEFT, TOP);
	text("Level: " + level, width / 2, 20);

	//Game over 
	if (gameOver) {
		isLeft = false; //Restricted GC movement
		isRight = false;
		fill(255, 0, 0);
		stroke(255, 0, 0);
		strokeWeight(5);
		textSize(70);
		textAlign(CENTER, CENTER);
		text('GAME OVER', width / 2, height / 2);
		canyonM.stop();
		bgMusic.stop();
		createRestartButton();
		return;
	}
	if (lives == 0) {
		gameOver = true;
		return;
	}
	else if (lives == 0 && score == 3) { //Game over when GC collects last collectable and touches enemy at the same time
		gameOver = true;
		return;
	}

}

function keyPressed() {
	if (keyCode == 37) {   //left arrow
		isLeft = true;
	}
	else if (keyCode == 39) {  //right arrow
		isRight = true;
	}
	else if (keyCode == 32 || keyCode == 38) {  //space bar or up arrow
		if (isPlummeting == false) {
			if (gameChar_y >= floorPos_y || onPlatform) {   //prevents double jumping
				gameChar_y -= 70;
				jumpM.play();
			}
		}
	}
	if (keyCode === 83) { // letter S
		if (!gameStarted) {
			gameStarted = true;
			bgMusic.play();
		}
	}
}

function keyReleased() {
	if (keyCode == 37) {  //left arrow
		isLeft = false;
	}
	else if (keyCode == 39) { //right arrow
		isRight = false;
	}
}

//check for canyons
function checkIfGameCharIsOverAnyCanyons() {
	for (var i = 0; i < canyons.length; i++) {
		checkIfGameCharIsOverCanyon(canyons[i]);
	}
}
function checkIfGameCharIsOverCanyon(canyon) {
	if (gameChar_x > canyon.x + 13 && gameChar_x < canyon.x + canyon.width - 13 && gameChar_y >= floorPos_y) {
		isPlummeting = true;
		canyonM.play();
	}
}

function drawFlagpole(flag) {
	//Pole
	stroke(100, 100, 100);
	strokeWeight(8);
	line(flag.x, floorPos_y, flag.x, floorPos_y - 250);
	// Flag
	if (flag.isReached) {
		fill(0, 255, 0); // Green flag when reached
	} else {
		fill(255, 0, 0); // Red flag when not reached
	}
	noStroke();
	beginShape();
	vertex(flag.x, floorPos_y - 250); // Top of the flagpole
	vertex(flag.x + 60, floorPos_y - 230);
	vertex(flag.x, floorPos_y - 205); // Bottom of the flag (point)
	endShape(CLOSE);

}

function restartGame() {
	if (lives > 0) {
		gameChar_x = width / 2;
		gameChar_y = floorPos_y - 5;
		isLeft = false;
		isRight = false;
		isFalling = false;
		isPlummeting = false;
		//Reset score
		for (var i = 0; i < collectables.length; i++) {
			collectables[i].isFound = false;
		}
		score = 0
		enemies = [];
		for (let i = 0; i < level; i++) {
			enemies.push(new Enemy(random(0, 300), floorPos_y - 10, 30, random(1, 2)));
		}
	}
	if (score == 3 && level < maxLevel) {
		gameChar_x = width / 2;
		gameChar_y = floorPos_y - 5;
		isLeft = false;
		isRight = false;
		isFalling = false;
		isPlummeting = false;
		//Reset score
		for (var i = 0; i < collectables.length; i++) {
			collectables[i].isFound = false;
		}
		score = 0;
		level++;
		for (let i = 0; i < level; i++) {
			enemies.push(new Enemy(random(100, 300), floorPos_y - 10, 30, random(1, 2)));
		}
	}
}

function createRestartButton() {
	if (!restartButton) {  // Ensure the button is only created once
		restartButton = createButton("Restart");
		restartButton.style('background-color', 'brown');
		restartButton.style('color', 'white');
		restartButton.style('font-size', '20px');
		restartButton.position(width / 2 - 50, height / 2 + 50);

		restartButton.mousePressed(() => {
			level = 1 // Reset level
			lives = 3; // Reset lives
			score = 0; // Reset score
			gameOver = false;
			win = false;
			restartButton.remove(); // Remove restart button
			restartButton = null; // Reset the button variable
			bgMusic.play();
			restartGame(); // Restart the game
		});
	}
}

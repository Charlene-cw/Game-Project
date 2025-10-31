function drawGCisLeftandisFalling() {  //jumping left

	fill(0);
	//ellipse(gameChar_x, gameChar_y, 5, 5);
	fill(255, 150, 170);
	ellipse(gameChar_x, gameChar_y - 52, 30); //head
	fill(240, 105, 180);
	rect(gameChar_x - 13, gameChar_y - 37, 26, 30); //body
	fill(250, 240, 230);
	rect(gameChar_x - 16, gameChar_y - 7, 10, 10); //legs
	rect(gameChar_x - 4, gameChar_y - 7, 10, 10);
	beginShape();
	vertex(gameChar_x - 13, gameChar_y - 31);
	vertex(gameChar_x - 13, gameChar_y - 21);
	vertex(gameChar_x - 20, gameChar_y - 14);
	vertex(gameChar_x - 20, gameChar_y - 24);
	endShape(CLOSE);
	beginShape();
	vertex(gameChar_x + 13, gameChar_y - 31);
	vertex(gameChar_x + 13, gameChar_y - 21);
	vertex(gameChar_x - 6, gameChar_y - 8);
	vertex(gameChar_x - 6, gameChar_y - 18);
	endShape(CLOSE);
}

function drawGCisRightandisFalling() { //jumping right

	fill(0);
	//ellipse(gameChar_x, gameChar_y, 5, 5);
	fill(255, 150, 170);
	ellipse(gameChar_x, gameChar_y - 52, 30); //head
	fill(240, 105, 180);
	rect(gameChar_x - 13, gameChar_y - 37, 26, 30); //body
	fill(250, 240, 230);
	rect(gameChar_x + 6, gameChar_y - 7, 10, 10); //legs
	rect(gameChar_x - 6, gameChar_y - 7, 10, 10);
	beginShape();
	vertex(gameChar_x - 13, gameChar_y - 31);
	vertex(gameChar_x - 13, gameChar_y - 21);
	vertex(gameChar_x + 5, gameChar_y - 8);
	vertex(gameChar_x + 5, gameChar_y - 18);
	endShape(CLOSE);
	beginShape();
	vertex(gameChar_x + 13, gameChar_y - 31);
	vertex(gameChar_x + 13, gameChar_y - 21);
	vertex(gameChar_x + 20, gameChar_y - 14);
	vertex(gameChar_x + 20, gameChar_y - 24);
	endShape(CLOSE);
}

function drawGCisLeft() {  //walk left

	fill(0);
	//ellipse(gameChar_x, gameChar_y, 5, 5);
	fill(255, 150, 170);
	ellipse(gameChar_x, gameChar_y - 52, 30); //head
	fill(240, 105, 180);
	rect(gameChar_x - 13, gameChar_y - 37, 26, 30); //body
	fill(250, 240, 230);
	rect(gameChar_x - 16, gameChar_y - 7, 10, 10); //legs
	rect(gameChar_x - 4, gameChar_y - 7, 10, 10);
}

function drawGCisRight() {

	fill(255, 150, 170);
	ellipse(gameChar_x, gameChar_y - 52, 30); //head
	fill(240, 105, 180);
	rect(gameChar_x - 13, gameChar_y - 37, 26, 30); //body
	fill(250, 240, 230);
	rect(gameChar_x + 6, gameChar_y - 7, 10, 10); //legs
	rect(gameChar_x - 6, gameChar_y - 7, 10, 10);
}

function drawGCisFallingOrisPlummeting() {  //jumping facing forward

	fill(0);
	//ellipse(gameChar_x, gameChar_y, 5, 5);
	fill(255, 150, 170);
	ellipse(gameChar_x, gameChar_y - 52, 30); //head
	fill(240, 105, 180);
	rect(gameChar_x - 13, gameChar_y - 37, 26, 30); //body
	fill(250, 240, 230);
	rect(gameChar_x - 15, gameChar_y - 7, 10, 10); //legs
	rect(gameChar_x + 5, gameChar_y - 7, 10, 10);
	beginShape();
	vertex(gameChar_x - 13, gameChar_y - 31);
	vertex(gameChar_x - 13, gameChar_y - 21);
	vertex(gameChar_x - 19, gameChar_y - 8);
	vertex(gameChar_x - 19, gameChar_y - 18);
	endShape(CLOSE);
	beginShape();
	vertex(gameChar_x + 13, gameChar_y - 31);
	vertex(gameChar_x + 13, gameChar_y - 21);
	vertex(gameChar_x + 19, gameChar_y - 8);
	vertex(gameChar_x + 19, gameChar_y - 18);
	endShape(CLOSE);
}

function drawGCstandingFront() {

	fill(255, 150, 170);
	ellipse(gameChar_x, gameChar_y - 52, 30); //head
	fill(240, 105, 180);
	rect(gameChar_x - 13, gameChar_y - 37, 26, 30); //body
	fill(250, 240, 230);
	rect(gameChar_x - 15, gameChar_y - 7, 10, 10); //legs
	rect(gameChar_x + 5, gameChar_y - 7, 10, 10);
}

function Enemy(x, y, size, speed) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.speed = speed;
	this.direction = 1;     // Moving direction (1 = right, -1 = left)
	this.range = 900;       // Range for movement
	this.startX = x;        // Store initial position

	// Update enemy position
	this.update = function () {
		this.x += this.speed * this.direction;

		// Reverse direction when reaching limits
		if (this.x > this.startX + this.range || this.x < this.startX - this.range) {
			this.direction *= -1;
		}
	};

	// Display the enemy
	this.display = function () {
		fill(255, 0, 0); // Red color
		ellipse(this.x, this.y, this.size, this.size); // Enemy body

		// Legs
		fill(0);
		ellipse(this.x - 5, this.y + this.size / 2, 10, 10);
		ellipse(this.x + 5, this.y + this.size / 2, 10, 10);
	};

	// Check if player collides with this enemy
	this.checkCollision = function (playerX, playerY) {
		let d = dist(playerX, playerY, this.x, this.y);
		if (d < this.size / 2 + 10) { // Collision detected
			if (lives > 0) {
				lives--;
				restartGame();
				this.x = this.startX
			}
			else {
				gameOver = true;
			}
		}
	};
}

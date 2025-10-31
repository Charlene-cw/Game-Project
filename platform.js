function Platform(x, y, width, height) {
	return {
		x: x,
		y: y,
		width: width,
		height: height,

		display: function () {
			fill(255, 140, 0);
			rect(this.x, this.y, this.width, this.height);
		},

		checkCollision: function (charX, charY) {
			if (
				charX > this.x &&
				charX < this.x + this.width &&
				charY + 5 >= this.y &&
				charY + 5 < this.y + this.height
			) {
				return true;
			}
			return false;
		}
	};
}
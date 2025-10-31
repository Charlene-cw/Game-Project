function drawScene() {
	background(100, 155, 255); //fill the sky blue
	noStroke();
	fill(0, 155, 0);
	rect(0, 432, 1024, 144); //draw some green ground
	fill(244, 164, 96)       //brown part of the ground
	rect(0, 432, 1024, 30);
	//Sun
	fill(255, 69, 0);
	ellipse(170, 100, 80, 80);
}

function drawTree(treeX) {
	//3. a tree
	var treeY = 190
	noStroke();
	fill(0, 155, 0);
	triangle(treeX, treeY, treeX - 75, treeY + 100, treeX + 75, treeY + 100);
	triangle(treeX, treeY, treeX - 75, treeY + 150, treeX + 75, treeY + 150);
	fill(139, 69, 19)
	rect(treeX - 25, treeY + 150, 54, 92);
}

function drawCloud(cloud_x, cloud_y, cloud_size) {
	noStroke();
	fill(255);
	ellipse(cloud_x, cloud_y, cloud_size, cloud_size);
	ellipse(cloud_x - 40, cloud_y, cloud_size - 20, cloud_size - 20);
	ellipse(cloud_x + 40, cloud_y, cloud_size - 20, cloud_size - 20);
}

function drawMountain(mount_x, mount_y) {
	fill(245, 245, 245);
	triangle(mount_x - 90, mount_y + 75, mount_x - 185, mount_y + 282, mount_x + 80, mount_y + 282);
	triangle(mount_x, mount_y, mount_x - 100, mount_y + 282, mount_x + 170, mount_y + 282);
	triangle(mount_x + 125, mount_y + 110, mount_x + 30, mount_y + 282, mount_x + 210, mount_y + 282);
	fill(25, 25, 112);
	beginShape();
	vertex(mount_x - 131, mount_y + 165);
	vertex(mount_x - 86, mount_y + 135);
	vertex(mount_x - 40, mount_y + 173);
	vertex(mount_x + 20, mount_y + 120);
	vertex(mount_x + 100, mount_y + 190);
	vertex(mount_x + 130, mount_y + 160);
	vertex(mount_x + 160, mount_y + 180);
	vertex(mount_x + 210, mount_y + 282);
	vertex(mount_x - 185, mount_y + 282);
	endShape(CLOSE);
}

function drawCanyons() {
	for (var i = 0; i < canyons.length; i++) {
		drawCanyon(canyons[i]);
	}
}

function drawCanyon(canyon) {
	noStroke();
	fill(120, 50, 30);
	rect(canyon.x, 432, canyon.width, height - floorPos_y); //144
}

function drawCollectables() {
	for (var i = 0; i < collectables.length; i++) {
		if (collectables[i].isFound == false) {
			drawCollectable(collectables[i]);
		}
	}
}

function drawCollectable(collectable) {
	noStroke();
	fill(255, 255, 0);
	beginShape();
	vertex(collectable.x, collectable.y - collectable.size); // Top point
	vertex(collectable.x + collectable.size, collectable.y); // Right point
	vertex(collectable.x, collectable.y + collectable.size); // Bottom point
	vertex(collectable.x - collectable.size, collectable.y); // Left point
	endShape(CLOSE);
	//ellipse(collectable.x, collectable.y, collectable.size, collectable.size);
}

function drawHeart(x, y, filled) {
	push();
	translate(x, y);
	fill(filled ? color(255, 105, 180) : color(255)); // Pink for filled, white for empty
	stroke(255); // heart border 
	strokeWeight(3);
	beginShape();
	vertex(0, -5);
	bezierVertex(-5, -15, -15, -10, -10, 0);
	bezierVertex(-10, 10, 0, 15, 0, 20);
	bezierVertex(0, 15, 10, 10, 10, 0);
	bezierVertex(15, -10, 5, -15, 0, -5);
	endShape(CLOSE);
	pop();
}
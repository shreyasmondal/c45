var character
var countDown = 3
var msCount = 3
var start, startImg

// game level //
var gameState = "level0"

// for level 0.1--------------------------------------------------------------------------------------------->
var characterStand, characterRunning, backgroundImg, football, footballImg
var goalKeeperImg, goalKeeperRight, goalKeeperLeft, goalKeeperTop, goalKeeperTR, goalKeeperTL
var goalPostR, goalPostL, goalPostT
var goalPostRI, goalPostLI, goalPostTI
var x, y
var savedGoals = 0
var goalPostTouching = 0
var tries = 5
var missedGoals = 0
var points = 0
var finishLine

//for level 1--------------------------------------------------------------------------------------------->
var pool
var swmimmer, swim, eSwmimmer, eSwim
var ship, shipImg
var dpMeter = 5
var cooldown = 20, c1, c2, c3
var speedInc = 10
var ifSpeedInc = 0
var obstacle1, obstaclesGroup
var check = 0
var uBound, lBound
var uHBound, lHBound
var blood, bloodImg
var Visibility = 255
var savedNotVisible = 0
var enemy
var divider
var touchCheck = 0
var enemySpeed = 0
var finishLineSprite
var lDetector = 0
var wDetector = 0
var levelD = 0

// variables for test--------------------------------------------------------------------------------------------->
var testT, testL, testR

function preload() {
	characterStand = loadImage("Character/8.png")
	characterRunning = loadAnimation("Character/1.png", "Character/2.png", "Character/3.png", "Character/4.png", "Character/5.png")
	startImg = loadImage("Character/start.png")

	//level 0-------------------------------------------------------------------------------------------------->
	backgroundImg = loadImage("Character/backgrounds/background 1.png")
	footballImg = loadImage("Character/football.png")
	goalKeeperImg = loadImage("Character/stand-small.png")
	goalKeeperRight = loadImage("Character/right-save-small.png")
	goalKeeperLeft = loadImage("Character/left-save-small.png")
	goalKeeperTop = loadImage("Character/top-save-small.png")
	goalKeeperTR = loadImage("Character/top-right-save-small.png")
	goalKeeperTL = loadImage("Character/top-left-save-small.png")

	//level 1----------------------------------------------------------------------------------------------------->
	pool = loadImage("Character/backgrounds/level 1.png")
	swmimmer = loadImage("Character/Swim/swc1.png")
	swim = loadAnimation("Character/Swim/swc1.png", "Character/Swim/swc2.png", "Character/Swim/swc3.png", "Character/Swim/swc4.png")
	obstacle1 = loadImage("Character/difficulties/shark-fin.png")
	bloodImg = loadImage("Character/Swim/blood.png")
	shipImg = loadImage("Character/Swim/ship1.png")
	finishLine = loadImage("Character/Swim/finish line.jpg")

	eSwmimmer = loadImage("Character/Swim/se1.png")
	eSwim = loadAnimation("Character/Swim/se1.png", "Character/Swim/se2.png", "Character/Swim/se3.png", "Character/Swim/se4.png")
}

function setup() {
	//creating canvas & character--------------------------------------------------------------------------->
	createCanvas(displayWidth - displayWidth / 3, displayHeight / 1.5);
	character = createSprite(100, 100, 20, 20)


	//Start Button--------------------------------------------------------------------------------------------->
	start = createSprite((displayWidth - displayWidth / 3) / 2, (displayHeight / 1.5) / 2, 10, 10)
	start.addImage("s", startImg)
	start.scale = 0.2

	//level 0----------------------------------------------------------------------------------------------->
	goalPostR = createSprite(displayWidth / 2 + 45, displayHeight / 2.7, 10, 320)
	goalPostL = createSprite(displayWidth / 5 - 95, displayHeight / 2.7, 10, 320)
	goalPostT = createSprite((displayWidth - displayWidth / 3) / 2, displayHeight / 5 - 30, 520, 10)
	goalPostRI = createSprite(displayWidth / 2 + 35, displayHeight / 2.7, 10, 320)
	goalPostLI = createSprite(displayWidth / 5 - 85, displayHeight / 2.7, 10, 320)
	goalPostTI = createSprite((displayWidth - displayWidth / 3) / 2, displayHeight / 5 + 10 - 30, 520, 10)
	football = createSprite((displayWidth - displayWidth / 3) / 2, displayHeight / 1.6)
	football.setCollider("circle", 0, 0, 24)

	//level 1--------------------------------------------------------------------------------------------------->
	obstaclesGroup = new Group()
	uBound = createSprite((displayWidth * 6) / 2, 160, displayWidth * 6, 10)
	lBound = createSprite((displayWidth * 6) / 2, displayHeight / 1.5 + 40, displayWidth * 6, 10)
	uHBound = createSprite((displayWidth * 6.5) / 2, 210, displayWidth * 6.5, 10)
	lHBound = createSprite((displayWidth * 6.5) / 2, displayHeight / 1.5 + 100, displayWidth * 6.5, 10)
	blood = createSprite(character.x, character.y, 10, 10)
	ship = createSprite(7750, (displayHeight / 1.5) / 2 + 50, 10, 10)
	enemy = createSprite(400, 260, 10, 10)
	divider = createSprite((displayWidth * 6.5) / 2, 357, displayWidth * 6.5, 15)
	divider.shapeColor = "red"
	finishLineSprite = createSprite(displayWidth * 6.5 + 70, displayHeight / 2, 10, displayHeight)


	// location test //



	//visibility for level 0--------------------------------------------------------------------->
	goalPostL.visible = false
	goalPostR.visible = false
	goalPostT.visible = false
	goalPostLI.visible = false
	goalPostRI.visible = false
	goalPostTI.visible = false
	football.visible = false

	//visibility for level 1--------------------------------------------------------------------->
	uBound.visible = false
	lBound.visible = false
	uHBound.visible = false
	lHBound.visible = false
	blood.visible = false
	ship.visible = false
	enemy.visible = false
	divider.visible = false
	finishLineSprite.visible = false


	character.addAnimation("ci", characterStand)
	character.addAnimation("cr", characterRunning)

	//adding images and animation for character-------------------------------------------------------------------->
	//for level 0.1----------------------------------->
	character.addImage("gK", goalKeeperImg)
	character.addImage("gKR", goalKeeperRight)
	character.addImage("gKL", goalKeeperLeft)
	character.addImage("gKT", goalKeeperTop)
	character.addImage("gKTR", goalKeeperTR)
	character.addImage("gKTL", goalKeeperTL)

	//for level 1------------------------------------>
	character.addImage("st", swmimmer)
	character.addAnimation("s", swim)
	blood.addImage("b", bloodImg)
	ship.addImage("ship", shipImg)
	enemy.addImage("ste", eSwmimmer)
	enemy.addAnimation("se", eSwim)


	character.scale = 0.25
	blood.scale = 0.10
	ship.scale = 0.5
	enemy.scale = 2
}


function draw() {
	background(0);

	//level 0------------------------------------------------------------------------------------------------->
	if (mousePressedOver(start)) {
		gameState = "level1"
		character.x = (displayWidth - displayWidth / 3) / 2
		character.y = displayHeight / 2
		if (gameState === "level1") {
			character.changeImage("gK", goalKeeperImg)
		}
		start.destroy()
	}

	//Level 0.1----------------------------------------------------------------------------------------------------->
	if (gameState === "level1") {
		background(backgroundImg)
		football.visible = true
		football.addImage("fo", footballImg)


		if (frameCount % 50 === 0 && tries > 0) {
			countDown = countDown - 1
		}

		// score texts //
		fill("black")
		textSize(20)
		text("Shots Left: " + tries, 10, 50)

		text("Goals Saved: " + savedGoals, 180, 50)

		text("Goals Missed: " + missedGoals, 370, 50)

		text("Points Scored: " + points, 560, 50)

		textSize(200)
		if (countDown >= 0 && tries > 0) {
			text(countDown, (displayWidth - displayWidth / 3) / 2 - 50, displayHeight / 2 - 50)
		}

		if (countDown < 0 && tries === 5) {
			football.velocityX = 10
			football.velocityY = -10
		}


		// character collision //
		character.collide(goalPostR)
		character.collide(goalPostL)
		character.collide(goalPostT)
		football.collide(goalPostL)
		football.collide(goalPostR)
		football.collide(goalPostT)

		character.scale = 1.2



		//saved or missed functions and actions------------------------------------------------------------------------------------------> 

		if (football.isTouching(goalPostRI) || football.isTouching(goalPostLI) || football.isTouching(goalPostTI) && tries > 0) {
			football.velocityX = 0
			football.velocityY = 0

			if (frameCount % 20 === 0 && tries > 0) {
				msCount = msCount - 1
			}

			textSize(150)
			fill("red")
			text("MISSED", (displayWidth - displayWidth / 3) / 2 - 290, displayHeight / 2 - 120)

			goalPostTouching = 1

			if (msCount < 0) {
				reset()
			}
		}


		//Goal Saved------------------------------------------------------------------------------------------> 

		if (football.isTouching(character) && (football.x > displayWidth / 2 - 100 || football.y < displayHeight / 5 + 100 || football.x < displayWidth / 5 + 80) && goalPostTouching !== 1) {
			football.velocityX = 0
			football.velocityY = 0
			character.velocityX = 0
			character.velocityY = 0

			if (frameCount % 20 === 0 && tries > 0) {
				msCount = msCount - 1
			}

			textSize(150)
			fill("green")
			text("SAVED", (displayWidth - displayWidth / 3) / 2 - 250, displayHeight / 2 - 120)

			if (msCount < 0) {
				wReset()
			}
		} else if (countDown < 0 && tries < 5 && tries > 0 && goalPostTouching === 0) {
			football.velocityX = x
			football.velocityY = y
		}

		// character movement for level 0//
		if (countDown < 0 && msCount === 3) {
			if (keyDown(RIGHT_ARROW)) {
				character.changeImage("gKR")
				character.velocityX = 10
				character.setCollider("circle", 50, 10, 30);
			}

			if (keyDown(LEFT_ARROW)) {
				character.changeImage("gKL")
				character.velocityX = -10
				character.setCollider("circle", -50, 10, 30);

			}

			if (keyDown(UP_ARROW)) {
				character.changeImage("gKT")
				character.velocityY = -10
				character.setCollider("circle", 0, -40, 30);
			}

			if (keyDown("D")) {
				character.changeImage("gKTR")
				character.velocityX = 10
				character.velocityY = -10
				character.setCollider("circle", 55, -40, 30);
			}

			if (keyDown("A")) {
				character.changeImage("gKTL")
				character.velocityX = -10
				character.velocityY = -10
				character.setCollider("circle", -55, -40, 30);
			}

			// football distance ------------------------------------------------------------------------->
			if (football.x % 2 && football.velocityX !== 0 && goalPostTouching === 0) {
				football.scale = football.scale - 0.01
			}
		}

		// level change ------------------------------------------------------------------------------->


		if (tries === 0) {
			if (points === 0) {
				disqualified()
			}
			if (points < 2 && points > 0 || points === 2) {
				gameState = "level 1.1"
				msCount = 5
				character.scale = 2
				character.x = 400
				character.y = 349
				character.changeImage("st")
				cooldown = c1 = 10
				football.destroy()
			}

			if (points === 3) {
				gameState = "level 2.1"
				msCount = 5
				character.scale = 2
				character.x = 400
				character.y = 349
				character.changeImage("st")
				cooldown = c2 = 15
				football.destroy()
			}

			if (points > 4 || points === 4) {
				gameState = "level 3.1"
				msCount = 5
				character.scale = 2
				character.x = 400
				character.y = 466
				character.changeImage("st")
				cooldown = c3 = 25
				football.destroy()
			}
		}
	}
	//Level 0 end--------------------------------------------------------------------------------------------------!>

//level 1--------------------------------------------------------------------------------------------------------------------------->	
	//Level 1 (easy)------------------------------------------------------------------------------------------------>
	if (gameState === "level 1.1") {
		image(pool, 0, 0, displayWidth * 6.5, displayHeight)
		camera.position.x = character.x
		camera.position.y = displayHeight / 2
		character.collide(uBound)
		character.collide(lBound)

		levelD = 1

		ship.visible = true

		character.setCollider("rectangle", 0, 0, 45, 27)

		if (character.visible === true && obstaclesGroup.isTouching(character)) {
			gameOver()
			check = 1
		}

		if (check < 1) {
			if (keyDown(RIGHT_ARROW) && savedNotVisible === 0) {
				character.changeAnimation("s")
				character.velocityX = 2
				if (frameCount % 12 === 0) {
					speedInc = speedInc - 1
				}

				if (speedInc < 0) {
					incInSpeed()
				}

				if (ifSpeedInc === 1) {
					character.velocityX = 5
				}

				if (ifSpeedInc === 2) {
					character.velocityX = 7
				}

				if (ifSpeedInc === 3) {
					character.velocityX = 9
				}
			} else {
				character.changeAnimation("st")
				character.velocityX = 0
				ifSpeedInc = 0
			}

			if (keyDown(UP_ARROW)) {
				character.velocityY = -5
			} else {
				character.velocityY = 0
			}

			if (keyDown(DOWN_ARROW)) {
				character.velocityY = 5
			}

			if (keyWentDown("SPACE") && cooldown === c1) {
				if (dpMeter > 0) {
					character.visible = false
				}

				cooldown = cooldown - 1
			}

			if (frameCount % 15 === 0 && character.visible === false && savedNotVisible === 0) {
				dpMeter = dpMeter - 1
			}

			if (cooldown <= 0) {
				cooldown = c1
			}

			if (frameCount % 20 === 0 && cooldown < c1) {
				cooldown = cooldown - 1
			}

			if (dpMeter <= 0) {
				character.visible = true
				dpMeter = 5
			}

			if (savedNotVisible === 0) {
				spawnObstacles1()
			}

			if (character.isTouching(ship)) {
				saved()
			}

			if (savedNotVisible === 1) {
				textSize(150)
				fill("green")
				text("SAVED", character.x - 200, (displayHeight / 1.5) / 2 + 130)
			}
		}
	}
	//Level 1 (easy) End------------------------------------------------------------------------------------------!>

	//Level 1 (medium)--------------------------------------------------------------------------------------------->
	if (gameState === "level 2.1") {
		image(pool, 0, 0, displayWidth * 6.5, displayHeight)
		character.collide(uBound)
		character.collide(lBound)

		character.setCollider("rectangle", 0, 0, 25, 20)

		levelD = 2

		ship.visible = true

		camera.position.x = character.x
		camera.position.y = displayHeight / 2

		if (character.visible === true && obstaclesGroup.isTouching(character)) {
			gameOver()
			check = 1
		}

		if (check < 1) {
			if (keyDown(RIGHT_ARROW) && savedNotVisible === 0) {
				character.changeAnimation("s")
				character.velocityX = 2
				if (frameCount % 20 === 0) {
					speedInc = speedInc - 1
				}

				if (speedInc < 0) {
					incInSpeed()
				}

				if (ifSpeedInc === 1) {
					character.velocityX = 5
				}

				if (ifSpeedInc === 2) {
					character.velocityX = 7
				}

				if (ifSpeedInc === 3) {
					character.velocityX = 9
				}
			} else {
				character.changeAnimation("st")
				character.velocityX = 0
				ifSpeedInc = 0
			}

			if (keyDown(UP_ARROW)) {
				character.velocityY = -3
			} else {
				character.velocityY = 0
			}

			if (keyDown(DOWN_ARROW)) {
				character.velocityY = 3
			}

			if (keyWentDown("SPACE") && cooldown === c2) {
				if (dpMeter > 0) {
					character.visible = false
				}

				cooldown = cooldown - 1
			}

			if (frameCount % 15 === 0 && character.visible === false && savedNotVisible === 0) {
				dpMeter = dpMeter - 1
			}

			if (cooldown <= 0) {
				cooldown = c2
			}

			if (frameCount % 20 === 0 && cooldown < c2) {
				cooldown = cooldown - 1
			}

			if (dpMeter <= 0) {
				character.visible = true
				dpMeter = 5
			}

			if (savedNotVisible === 0) {
				spawnObstacles2()
			}

			if (character.isTouching(ship)) {
				saved()
			}

			if (savedNotVisible === 1) {
				textSize(150)
				fill("green")
				text("SAVED", character.x - 200, (displayHeight / 1.5) / 2 + 130)
			}
		}
	}
	//Level 1 (medium) End----------------------------------------------------------------------------------------------------!>

	//Level 1 (hard)------------------------------------------------------------------------------------------------------------>
	if (gameState === "level 3.1") {
		image(pool, 0, 0, displayWidth * 6.5, displayHeight)
		camera.position.x = character.x
		camera.position.y = displayHeight / 2

		image(finishLine, displayWidth * 6.5, 0, 300, displayHeight)

		levelD = 3

		enemy.visible = true
		divider.visible = true

		character.setCollider("rectangle", 9, 0, 40, 20)
		enemy.setCollider("rectangle", 12, 0, 55, 40)
		character.collide(divider)
		enemy.collide(divider)
		character.collide(lHBound)
		enemy.collide(uHBound)

		if (enemy.isTouching(obstaclesGroup)) {
			enemy.velocityY = random(-5,5)
		}

		

		if (frameCount % 35 === 0) {
			countDown = countDown - 1
		}

		textSize(200)
		if (countDown >= 0) {
			text(countDown, (displayWidth - displayWidth / 3) / 2 - 50, 420)
		}

		if (character.visible === true) {
			if (character.isTouching(obstaclesGroup)) {
				isTouchingShark()
			}
		}

		if (countDown < 0) {
			if (keyDown(RIGHT_ARROW) && savedNotVisible === 0) {
				character.changeAnimation("s")
				character.velocityX = 2
				if (frameCount % 12 === 0) {
					speedInc = speedInc - 1
				}

				if (speedInc < 0) {
					incInSpeed()
				}

				if (ifSpeedInc === 1) {
					character.velocityX = 5
				}

				if (ifSpeedInc === 2) {
					character.velocityX = 7
				}

				if (ifSpeedInc === 3) {
					character.velocityX = 9
				}
			} else {
				character.changeAnimation("st")
				character.velocityX = 0
				ifSpeedInc = 0
			}

			if (keyDown(UP_ARROW) && (wDetector === 0 || lDetector === 0)) {
				character.velocityY = -5
			} else {
				character.velocityY = 0
			}

			if (keyDown(DOWN_ARROW) && (wDetector === 0 || lDetector === 0)) {
				character.velocityY = 5
			}

			if (keyWentDown("SPACE") && cooldown === c3) {
				if (dpMeter > 0) {
					character.visible = false
				}

				cooldown = cooldown - 1
			}

			if (frameCount % 15 === 0 && character.visible === false && savedNotVisible === 0) {
				dpMeter = dpMeter - 1
			}

			if (cooldown <= 0) {
				cooldown = c1
			}

			if (frameCount % 20 === 0 && cooldown < c1) {
				cooldown = cooldown - 1
			}

			if (dpMeter <= 0) {
				character.visible = true
				dpMeter = 5
			}

			if (enemySpeed === 0) {
				enemy.velocityX = 4
			}

			if (enemySpeed === 1) {
				enemy.velocityX = 4.7
			}

			if (enemySpeed === 2) {
				enemy.velocityX = 6.55
			}

			if (enemySpeed >= 3) {
				enemy.velocityX = 8.4
			}

			if (enemy.isTouching(finishLineSprite)) {
				enemy.velocityX = 0
			}

			if (character.isTouching(finishLineSprite)) {
				character.velocityX = 0
				character.changeImage("st")
			}

			if (enemy.velocityX > 0) {
				enemy.changeAnimation("se")
			} else {
				enemy.changeImage("ste")
			}

			if (enemy.isTouching(finishLineSprite) && wDetector === 0) {
				lDetector = 1
				lost()
			}

			if (character.isTouching(finishLineSprite) && lDetector === 0) {
				wDetector = 1
				won()
			}

			if (lDetector === 0 && wDetector === 0) {
				spawnObstacles3()
			}
		}
	}
	//Level 1 (hard) End---------------------------------------------------------------------------------------------!>
//level 1 end-----------------------------------------------------------------------------------------------------------------!

    //level change-------------------------------------------------------------------------------------------->
	if (ship.x>8100 && levelD === 1) {
		gameState = "level1.2"
		obstaclesGroup.destroyEach()
	}

	if (ship.x>8100 && levelD === 2) {
		gameState = "level2.2"
		obstaclesGroup.destroyEach()
	}

	if (wDetector === 1) {
		gameState = "level3.2"
		enemy.destroy()
		divider.destroy()
		obstaclesGroup.destroyEach()
	}

	//Console statements-------------------------------------------------------------------------->
	console.log(ship.x)
	enemy.debug = false


	drawSprites();
}

//functions for level 0-------------------------------------------------------------------------------------------------------------------------->

//reset function for level 0------------------------------------------------------------------------------------------>
function reset() {
	tries = tries - 1
	missedGoals = missedGoals + 1
	countDown = 3
	msCount = 3
	goalPostTouching = 0

	football.x = (displayWidth - displayWidth / 3) / 2
	football.y = displayHeight / 1.6
	character.x = (displayWidth - displayWidth / 3) / 2
	character.y = displayHeight / 2


	character.changeImage("gK", goalKeeperImg)
	character.velocityY = 0
	character.velocityX = 0
	football.scale = 1
	character.setCollider("rectangle", 0, 0, 70, 130);

	rand()
}

//reset on scoring goals (level 0)------------------------------------------------------------------------------>
function wReset() {
	tries = tries - 1
	savedGoals = savedGoals + 1
	points++
	countDown = 3
	msCount = 3

	football.x = (displayWidth - displayWidth / 3) / 2
	football.y = displayHeight / 1.6
	character.x = (displayWidth - displayWidth / 3) / 2
	character.y = displayHeight / 2


	character.changeImage("gK", goalKeeperImg)
	character.velocityY = 0
	character.velocityX = 0
	football.scale = 1
	character.setCollider("rectangle", 0, 0, 70, 130);

	rand()
}

function disqualified() {
	tries = 5
	savedGoals = 0
	missedGoals = 0
}

function rand() {
	x = random(15, -15)
	y = random(-10, -2)
}


//!!functions for level 0--------------------------------------------------------------------------------------------------------------------------!>

//functions for level 1------------------------------------------------------------------------------------------------------------------------>

function incInSpeed() {
	speedInc = 10
	if (ifSpeedInc < 3) {
		ifSpeedInc = ifSpeedInc + 1
		enemySpeed = enemySpeed + 1
	}
}

function spawnObstacles1() {
	if (character.x < displayWidth * 2) {
		if (frameCount % 30 === 0) {
			var obstacle = createSprite(character.x + 420, random(160, displayHeight / 1.5 + 10), 10, 40);
			obstacle.velocityX = Math.round(random(-4, -8));

			obstacle.addImage("o", obstacle1)
			obstacle.setCollider("rectangle", 0, 0, 10, 17)

			//assign scale and lifetime to the obstacle           
			obstacle.scale = 0.17;
			//add each obstacle to the group
			obstaclesGroup.add(obstacle);
		}
	} else {
		if (frameCount % 20 === 0) {
			var obstacle = createSprite(character.x + 420, random(160, displayHeight / 1.5 + 10), 10, 40);
			obstacle.velocityX = Math.round(random(-4, -12));

			obstacle.addImage("o", obstacle1)
			obstacle.setCollider("rectangle", 0, 0, 10, 17)

			//assign scale           
			obstacle.scale = 0.17;
			obstaclesGroup.add(obstacle);
		}
	}
}

function spawnObstacles2() {
	if (character.x < displayWidth * 2) {
		if (frameCount % 30 === 0) {
			var obstacle = createSprite(character.x + 420, random(160, displayHeight / 1.5 + 10), 10, 40);
			obstacle.velocityX = Math.round(random(-4, -8));

			obstacle.addImage("o", obstacle1)
			obstacle.setCollider("rectangle", 0, 0, 10, 17)

			//assign scale and lifetime to the obstacle           
			obstacle.scale = 0.17;
			//add each obstacle to the group
			obstaclesGroup.add(obstacle);
		}
	} else {
		if (frameCount % 20 === 0) {
			var obstacle = createSprite(character.x + 420, random(160, displayHeight / 1.5 + 10), 10, 40);
			obstacle.velocityX = Math.round(random(-4, -15));

			obstacle.addImage("o", obstacle1)
			obstacle.setCollider("rectangle", 0, 0, 10, 17)

			//assign scale           
			obstacle.scale = 0.17;
			obstaclesGroup.add(obstacle);
		}
	}
}

function spawnObstacles3() {
	if (character.x < displayWidth * 2) {
		if (frameCount % 25 === 0) {
			var obstacle = createSprite(random(character.x + 570, enemy.x + 570), random(160, displayHeight / 1.5 + 100), 10, 40);
			obstacle.velocityX = Math.round(random(-5, -10))

			obstacle.addImage("o", obstacle1)
			obstacle.setCollider("rectangle", 0, 0, 10, 17)

			//assign scale and lifetime to the obstacle           
			obstacle.scale = 0.17;
			//add each obstacle to the group
			obstaclesGroup.add(obstacle);
		}
	} else {
		if (frameCount % 15 === 0) {
			var obstacle = createSprite(random(character.x + 570, enemy.x + 570), random(160, displayHeight / 1.5 + 100), 10, 40);
			obstacle.velocityX = Math.round(random(-7, -15));

			obstacle.addImage("o", obstacle1)
			obstacle.setCollider("rectangle", 0, 0, 10, 17)

			//assign scale           
			obstacle.scale = 0.17;
			obstaclesGroup.add(obstacle);
		}
	}
}

function gameOver() {
	character.velocityX = 0
	character.velocityY = 0
	obstaclesGroup.setVelocityEach(0, 0)
	fill("Red")
	textSize(40)
	text("Game Over! The Sharks Ate YOU!!!", character.x - 300, (displayHeight / 1.5) / 2 + 130)
	character.changeImage("st")
	Visibility = Visibility - 35
	tint(255, Visibility)
	if (Visibility < 255) {
		blood.visible = true
		blood.x = character.x
		blood.y = character.y
	}
}

function saved() {
	ship.velocityX = 4
	character.velocityX = 0
	character.velocityY = 0
	character.visible = false
	savedNotVisible = 1
}

function isTouchingShark() {
	ifSpeedInc = 0
}

function won() {
	textSize(60)
	fill("green")
	text("You Won", character.x - 340, 270)
}

function lost() {
	textSize(60)
	fill("red")
	text("You Lost", character.x - 345, 270)
}
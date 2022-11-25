var spaceImg, space;
var enemyImg, enemy;
var meteorImg, meteor, meteorsGroup;
var rocket, rocketImg;
var laser, laserImg
var laser2, laser2Img
var gameState = "PLAY"
var spaceSound;
var explosionImg, explosion

function preload(){
  spaceImg = loadImage("space.jpg")
  enemyImg = loadImage("enemy.png")
  meteorImg = loadImage("meteor.png")
  rocketImg = loadImage("rocket.gif")
  laserImg = loadImage("laser.png")
  laser2Img = loadImage("laser2.png")
  spaceSound = loadSound("spaceSound.mp3")
  explosionImg = loadImage("explosion.jpg")
}

function setup(){
  createCanvas(600,600);

  spaceSound.loop()

  space = createSprite(300, 300)
  space.addImage("space", spaceImg);
  space.scale = 2

  rocket = createSprite(300, 375)
  rocket.addImage("rocket", rocketImg);
  rocket.scale = 0.256

  enemy = createSprite(500, 560)
  enemy.addImage("enemy", enemyImg)
  enemy.scale = 0.14
  enemy.velocityX = -2.5

  laser = createSprite(512,560)
  laser.addImage("laser", laserImg)
  laser.scale = 0.4
  laser.velocityY = -3
  laser.x = enemy.x + 12

  laser2 = createSprite(488,560)
  laser2.addImage("laser2", laser2Img)
  laser2.scale = 0.4
  laser2.velocityY = -3
  laser2.x = enemy.x - 12

  explosion = createSprite(300,300)
  explosion.addImage("explosion", explosionImg)
  explosion.visible = false
  
  meteorsGroup = new Group()  
}

function draw(){
  if(gameState === "PLAY"){

  if(space.y>400){
    space.y = 200
  }

  if(keyDown("left_arrow")){
    rocket.x -= 5
  }

  if(keyDown("right_arrow")){
    rocket.x += 5
  }

  if(rocket.isTouching(meteorsGroup)||rocket.isTouching(laser)||rocket.isTouching(laser2)){
    rocket.destroy()
    explosion.visible = true
    gameState = "END"
  }

  if(rocket.x>590){
    rocket.x = 590
  }
  
  if(rocket.x<10){
    rocket.x = 10
  }

  if(enemy.x>590){
    enemy.velocityX += -2.5
  }

  if(enemy.x<10){
    enemy.velocityX += 2.5
  }

  if((laser.y<350)||(laser.x>590)||(laser.x<10)){
    laser.x = enemy.x + 12
    laser.y = enemy.y
    laser.velocityY = -3
  }

  if((laser2.y<350)||(laser2.x>590)||(laser2.x<10)){
    laser2.x = enemy.x - 12
    laser2.y = enemy.y
    laser2.velocityY = -3
  }

  space.velocityY = space.velocityY + 0.02
  meteorsGroup.velocityY = space.velocityY
  laser.velocityY = laser.velocityY + 0.015
  laser2.velocityY = laser2.velocityY + 0.015
  enemy.velocityX = enemy.velocityX + 0.01

  if(space.velocityY>5){
    meteor.velocityY = 10
    if(keyDown("left_arrow")){
      rocket.x -= 7
    }
  
    if(keyDown("right_arrow")){
      rocket.x += 7
    }
    laser.velocityY = -2
    laser2.velocityY = -4
    if(enemy.x>590){
      enemy.velocityX += -3.5
    }
  
    if(enemy.x<10){
      enemy.velocityX += 3.5
    }
  }

  if(space.velocityY>10){
    meteor.velocityY = 15
    if(keyDown("left_arrow")){
      rocket.x -= 11
    }
  
    if(keyDown("right_arrow")){
      rocket.x += 11
    }
    laser.velocityY = -6
    laser2.velocityY = -4
    if(enemy.x>590){
      enemy.velocityX += -5.5
    }
  
    if(enemy.x<10){
      enemy.velocityX += 5.5
    }
  }

  if(space.velocityY>15){
    meteor.velocityY = 20
    if(keyDown("left_arrow")){
      rocket.x -= 14
    }
  
    if(keyDown("right_arrow")){
      rocket.x += 14
    }
    laser.velocityY = -6
    laser2.velocityY = -8
    if(enemy.x>590){
      enemy.velocityX += -7.5
    }
  
    if(enemy.x<10){
      enemy.velocityX += 7.5
    }
  }

  if(space.velocityY>30){
    meteor.velocityY = 30
    if(keyDown("left_arrow")){
      rocket.x -= 21
    }
  
    if(keyDown("right_arrow")){
      rocket.x += 21
    }
    laser.velocityY = -15
    laser2.velocityY = -13
    if(enemy.x>590){
      enemy.velocityX += -14.5
    }
  
    if(enemy.x<10){
      enemy.velocityX += 14.5
    }
  }
 
  spawnMeteors()
  drawSprites();
}
  
  if(gameState === "END"){
    textSize(70)
    fill("black")
    text("GAME OVER!!!",50, 400)
  }
}

function spawnMeteors() {
  if(frameCount%200 === 0){   
    meteor = createSprite(200, 1)
    meteor.addImage("meteor", meteorImg)
    meteor.velocityY = 6
    meteor.scale = 0.7
    meteor.x = Math.round(random(1,600))
    meteor.lifetime = 800
    meteorsGroup.add(meteor)
  }
}
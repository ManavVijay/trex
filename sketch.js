var trex,trexRunning,trexCollided,ground,groundInvisible,groundImage;
var cloudsGroup,obstaclesGroup,cloudImg,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var PLAY=1,END=0,gameState=PLAY,score=0;
var gameOver,restart,gameoverImg,restartImg;

function preload() {
 trexRunning = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexCollided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  restartImg = loadImage("restart.png");
  gameoverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,20);
  trex.addAnimation("trexRunning",trexRunning);
  trex.addAnimation("trexCollided",trexCollided);
  trex.scale = 0.5;
  
  ground = createSprite(300,180,600,10);
  ground.addImage("groundImage",groundImage);
  
  groundInvisible = createSprite(300,190,600,10);
  groundInvisible.visible = false;
  
  restart = createSprite(300,100,20,20);
  restart.addImage("restart",restartImg);
  restart.scale = 0.5;
  restart.visible = false;
  
  gameOver = createSprite(300,70,20,20);
  gameOver.addImage("gameover",gameoverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background("Aliceblue");
  
  if(gameState === PLAY){
   score = score+Math.round(getFrameRate()/60);
    
   ground.velocityX = -(6 + 3*score/100);
    
   if(keyDown("space") && trex.isTouching(ground)){
   trex.velocityY = -10; 
    }
    
   trex.velocityY = trex.velocityY+0.5;
    
   if(ground.x<0){
   ground.x = ground.width/2 
    }
    
   spawnClouds();
   spawnObstacles();
    
   if(trex.isTouching(obstaclesGroup)){
    gameState = END; 
   }
    
  }else if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    trex.changeAnimation("trexCollided",trexCollided);
    
  }
  
  text("score="+ score,500,50);
  
  trex.collide(groundInvisible);
  
  if(mousePressedOver(restart)){
    reset(); 
    }
  
  drawSprites();
  
}

function spawnClouds(){
  
 if(frameCount % 60 === 0){
   var cloud = createSprite(600,100,20,10);
   cloud.addAnimation("cloud.png",cloudImg);
   cloud.scale = 0.5;
   var rand = Math.round(random(20,80));
   cloud.y = rand;
   cloud.velocityX = -3;
   
   cloud.depth = trex.depth;
   trex.depth = trex.depth+1;
   
   cloud.lifeTime = 200;
   
   cloudsGroup.add(cloud);
   
 }
}

function spawnObstacles(){
 
  if(frameCount % 60 === 0){
    var obstacle = createSprite(600,160,10,10);
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addAnimation("obstacle1.png",obstacle1)
        break;
      case 2:obstacle.addAnimation("obstacle2.png",obstacle2)
        break;
      case 3:obstacle.addAnimation("obstacle3.png",obstacle3)
        break;  
      case 4:obstacle.addAnimation("obstacle4.png",obstacle4)
        break;
      case 5:obstacle.addAnimation("obstacle5.png",obstacle5)
        break;
      case 6:obstacle.addAnimation("obstacle6.png",obstacle6)
        break;  
    }
    
    obstacle.velocityX = -(6 + 3*score/100);
    
    obstacle.scale = 0.5;
    
    obstacle.lifetime = 200;
    
    obstaclesGroup.add(obstacle);
    
  }
}

function reset(){
  
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  cloudsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  
  score = 0;
  
  trex.changeAnimation("trexRunning",trexRunning);
  
}
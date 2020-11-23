var PLAY = 1;
var END = 0;
var gameState = PLAY;
var dino, dinoWalking ,deadDino;
var backG, backGimg;
var invisibleG, ground, groundImage;
var score;
var checkPointSound;
var jumpSound;
var backgroundMusic;
var obstacle, obstacleImage;

function preload(){
  dinoWalking = loadAnimation("images/dino.png","images/dino2.png","images/dino3.png","images/dino4.png");
  backGimg = loadImage("images/background.png");
  groundImage = loadImage("images/ground2.png");
  obstacleImage = loadImage("images/cactus.png");
  deadDino = loadImage("images/deadDino.png");

  checkPointSound = loadSound("sound/CP.mp3");
  jumpSound = loadSound("sound/CJ.mp3");
  backgroundMusic = loadSound("sound/BGM.mp3");

}

function setup() {
  createCanvas(1600,800);

   dino = createSprite(300,300,20,20);
   dino.addAnimation("dino_walking",dinoWalking);
   dino.scale = 1;

   invisibleG = createSprite(800,650,2000,10);
   invisibleG.visible = false;

   ground = createSprite(800,590,400,800);
   ground.addImage(groundImage);
   ground.scale = 3;

   score = 0;

}

function draw() {
  background(backGimg);

  ground.depth = dino.depth;
  dino.depth = dino.depth +10;

  textSize(20);
  text("Score: "+ score, 1000,100);

  if(dino.isTouching(invisibleG)){
    dino.collide(invisibleG);
  }

  if(gameState === PLAY){

  //backgroundMusic.play();

  if(score>0 && score%100 === 0){
    checkPointSound.play() 
 }

 ground.velocityX = -(4 + 3* score/100)
  score = score + Math.round(getFrameRate()/60);

  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  if(keyDown("space")&& dino.y >= 100) {
    dino.velocityY = -20;
    jumpSound.play();
  }  

  dino.velocityY = dino.velocityY + 0.8;

  spawnObstacles();

 // if(dino.isTouching(obstacle)){
  //  gameState = END;
 // }

  }
  //else if(gameState === END){
  //  dino.changeImage("images/deadDino");
  //}

  drawSprites();
}

function spawnObstacles(){
  if (frameCount % 100 === 0){
    var obstacle = createSprite(1800,530,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -(6 + score/100);
  } 
}  
//declaring the trex and ground
var trex,trexRunning;
var ground, groundImage, invisibleGround;
var clouds,cloudImg;
var obstacleImg;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var restart, restart_button;

var gameOver, gameOverImg;

var trex_collided;

var cloudsGroup;

var obstacleGroup;

var score=0;

var PLAY = 1;

var END = 0;

var dieSound, checkPointSound, jumpSound;

gamestate = PLAY;
function preload(){
      //loading both the trex and ground images/animations
                trexRunning = loadAnimation("trex1.png","trex3.png","trex4.png");
                groundImage = loadImage("ground2.png");
cloudImg=loadImage("download.png");
 trex_collided=loadAnimation("trex_collided.png");  
obstacle1=loadImage("obstacle1[1].png");
obstacle2=loadImage("obstacle2[1].png");
obstacle3=loadImage("obstacle3[1].png");
obstacle4=loadImage("obstacle4[1].png");
obstacle5=loadImage("obstacle5[1].png");
obstacle6=loadImage("obstacle6[1].png");
  restart_button=loadImage("restart.png");
  gameOverImg=loadImage("gameOver.png");
  dieSound=loadSound("die.mp3");
  jumpSound=loadSound("jump.mp3");
  checkPointSound=loadSound("checkPoint.mp3");
}


function setup(){
      //creating the canvas
              createCanvas(windowWidth,windowHeight);
      //creating the trex sprite by adding and scaling animation
              trex = createSprite(width/20,height/2.5,20,90);
              trex.addAnimation("trex",trexRunning);
  trex.addAnimation("trex_collided",trex_collided);
              trex.scale=0.5;
  trex.debug = false;
  trex.setCollider("circle",0,0,30);

    //creating the ground sprite by adding velocity and image
              ground = createSprite(width,height/3,600,30);
              ground.addImage("ground", groundImage);
              
    //creating the invisible ground
          invisibleGround=createSprite(width/2,height,width,650);
          invisibleGround.visible=false;

  obstacleGroup = createGroup();
  cloudsGroup = createGroup();
  
  restart = createSprite(width/2,height/5,30,30);
  restart.addImage("restart", restart_button);
  restart.scale=0.5
  gameOver = createSprite(width/2,height/8,30,30);
  gameOver.addImage("gameOver",gameOverImg);
  
} 



function draw(){
      //making the background white
              background("white");
  trex.collide(invisibleGround);
  
   textSize=15;
  text("Score:"+score,500,10);
  

  
  
 if (gamestate===PLAY){ 
 //making the ground infinite
              if(ground.x<0){
                ground.x=ground.width/2;
              }
   ground.velocityX=-(2+score/100);
   trex.changeAnimation("trex",trexRunning);
//allowing the trex to jump and come back down
              if(touches.length>0||keyDown("space")&&trex.y>50){
                trex.velocityY=-8; 
                jumpSound.play();
                touches=[];
              }
   console.log(trex.y);
 trex.collide(invisibleGround);
 trex.velocityY=trex.velocityY+0.5;
 //calling function spawn clouds
              spawnClouds();
  spawnObstacles();
 
 score = score+ Math.round(frameCount/200);
   if(score>0&& score% 100===0){
     checkPointSound.play();
   }
 
 if(obstacleGroup.isTouching(trex)){
    gamestate=END;
   trex.changeAnimation("trex_collided",trex_collided);
  }
 restart.visible=false;
   gameOver.visible=false;
 }
  
else if(gamestate===END){
  trex.velocityY=0;
  obstacleGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  ground.velocityX=0;
  //changing the trex's animation
  restart.visible=true;
  gameOver.visible=true;
  if(touches.length>0||mousePressedOver(restart)){
    reset();
    touches=[];
  }
}
  
  
  //drawing the sprites
              drawSprites();
  //console.log(gamestate);
}

//creating the clouds and putting them in random areas
function spawnClouds(){
  if(frameCount % 90===0){
    var rand = random(10,110);
clouds=createSprite(600,30,30,30);
    clouds.y=Math.round(rand);
  clouds.velocityX=-6;
    clouds.addImage(cloudImg);
    clouds.scale=0.2;
    
    trex.depth=clouds.depth;
    trex.depth = trex.depth+1;
    
    gameOver.depth=clouds.depth;
    gameOver.depth=gameOver.depth+1;
    
    restart.depth=clouds.depth;
    restart.depth=restart.depth+1;
  
   cloudsGroup.add(clouds);
    
    
}
 
}

function spawnObstacles(){
 
  if(frameCount % 80===0){
    var rand=Math.round(random(1,6));
    var obstacle=createSprite(600,180,30,30);
    obstacle.scale=0.5;
     obstacle.velocityX=-(6+score/100);
    obstacle.debug=false;
    switch(rand){
        
        case 1:obstacle.addImage("ob1",obstacle1);
        break;
        
        case 2:obstacle.addImage("ob1",obstacle2);
        break;
        
        case 3:obstacle.addImage("ob1",obstacle3);
        break;
        
        case 4:obstacle.addImage("ob1",obstacle4);
        break;
        
        case 5:obstacle.addImage("ob1",obstacle5);
        break;
        
        case 6:obstacle.addImage("ob1",obstacle6);
        break;
        
        default:
        break;
    }
    obstacleGroup.add(obstacle);
  }
  
  
}

function reset(){
  gamestate=PLAY;
  score=0;
  gameOver.visible=false;
  restart.visible=false;
 obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();
}



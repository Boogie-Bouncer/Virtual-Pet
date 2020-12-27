var dog, happyDog, hungryDog, database, foodS, foodStockRef;
var frameCountNow = 0;
var fedTime, lastFed, foodObject, currentTime;
var milk, input, name;
var gameState="hungry";
var gameStateRef;
var bedroomIMG, washroomIMG, gardenIMG, sleepIMG, runIMG;
var feed, addFood; 
var input, button;

function preload()
{
  hungryDog=loadImage("images/dogImg.png");
  happyDog= loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1200, 800);
  database=firebase.database();

  dog=createSprite(width/2+250,height/2, 10,10);
  dog.addAnimation("hungry",hungryDog);
  dog.addAnimation("happy",happyDog);
  dog.addAnimation("sleeping",sleepIMG);
  dog.addAnimation("run",runIMG);
  dog.scale=0.3;

  getGameState;

  feed=createButton("Feed the Dog")
  feed.position(950,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food")
  addFood.position(1050,95);
  addFood.mousePressed(addFoods);

  input=createInput("Pet Name")
  input.position(950,120);

  button=createButton("Confire");
  button.position(1000,145);
  button.mousePressed(createName);
}

function draw() {  
 
  currentTime=hour();
  if(currentTime=== lastFed+1){
  gameState="playing";
  updateGmaestate();
  foodObject.garden();
  }

  else if(currentTime=== lastFed+1){
    gameState="sleeping";
    updateGmaestate();
    foodObject.bedroom();
  }

  else if(currentTime > lastFed+2 && currentTime<= lastFed+4){
    gameState="bathing";
    updateGmaestate();
    foodObject.washroom();
  }

  else{
    gameState="hungry";
    updateGmaestate();
    foodObj.display();
  }
  //console.log(gameState)

  foodObj.getFoodStock();
  //console.log(foodStock);
  getGameState();

  fedTime= database.ref(' feedTime ');
  fedTime.on("value", function(data){
   lastfed=data.val();
  })
   
  if(gameState==="hungry"){

    feed.show();
    addFood.show();
    dog.addAnimation("hungry", hungryDog)
  }
 
  else{
   feed.hide();
   addFood.hide();
   dog.remove();
  }

  drawSprites();
  //add styles here
  textSize(30);
  fill("black");
  textSize(20);
  text("Last Fed:"+ lastFed,":00",300,95);

}




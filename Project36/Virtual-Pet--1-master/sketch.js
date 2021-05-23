var image,dog,happyDog,database,foodS,foodStock,button1,button2,fedTime,lastFed,food,gameState,changeGameState,readGameState,bedroomImage,washroomImage,gardenImage,currentTime,gs=0,milk,milks;

function preload()
{
	dogImage = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
  bedroomImage = loadImage("Bed Room.png");
  washroomImage = loadImage("Wash Room.png");
  gardenImage = loadImage("Garden.png");
}

function setup() {
 
	createCanvas(800,500);
  database = firebase.database();
  milks = createGroup();
  dog = createSprite(400,400,150,150);
  dog.addImage(dogImage);
  dog.scale = 0.15;
  food = new Foods();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  button1 = createButton('Feed the dog');
  button1.position(850,100);
  button1.style('background','lightBlue');
  button1.mousePressed(feedDog);
  button2 = createButton('Add Food');
  button2.position(950,100);
  button2.style('background','lightBlue');
  button2.mousePressed(addFoods);
  readGameState = database.ref('gameState');
  readGameState.on("value",function(data){
    gameState = data.val();
  });
}


function draw() {  
  background(46,139,87);
 

  if(gs=0){
    background(46,139,87);
  }
 else if(gs=1){
    background(bedroomImage);
  }
 else if(gs=2){
    background(washroomImage);
  }
 else if(gs=3){
    background(gardenImage);
  }



  // if(gameState!="hungry"){
  //   button1.hide();
  //   button2.hide();
  //   dog.visible = false;
  // }
  // else{
  //   button1.show();
  //   button2.show();
  //   dog.visible = true;
  // }
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  currentTime = hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    food.garden();
  }
  else if(currentTime==(lastFed+2)){
    update("Sleeping");
    food.bedRoom();
  }
  else if(currentTime>(lastFed+2)&&currentTime<(lastFed+4)){
    update("Bathing");
    food.washRoom();
  }
  else{
    update("hungry");
    food.display();
  }

  drawSprites();
  textSize(20);
  fill(255,144,4);
  stroke(0);
  text("food left " +  foodS,10,300);
 
  fill(255,255,254);
  textSize(15);

  if(lastFed>= 12){
    text("Last Feed : "+lastFed%12 + " PM",350,50);
  }
  else if(lastFed==0){
    text("Last Feed : 12 AM",350,50);
  }
  else{
    text("Last Feed : "+ lastFed + " AM",350,50);
  }

 
}


function addFoods(){
  foodS++
  database.ref('/').update({
    Food : foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);
  foodS--;
  if(foodS <= 0){
    foodS = 0;
  }

  // if(foodS >= 10){
  //   foodS = 10;
  // }
  // food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    Food : foodS,
    FeedTime : hour()
  })

}

function readStock(data){
  
  foodS = data.val();
}
function writeStock(x){
   if(x <= 0){
      x = 0;
   } 
   else{
      x = x-1;
   } 
   database.ref('/').update({
      Food : x
   })
   }

   function update(state){
    database.ref('/').update({
      gameState : state
    })
   }

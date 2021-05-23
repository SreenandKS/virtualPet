class Foods{
    constructor(){
        this.img = loadImage("Milk.png");
        var foodStock,lastFed,milk;
       this.foodStock = database.ref('Food');
       this.foodStock.on("value",function(data){
           foodS = data.val();
       })
       
    }
    display(){

       

      
        var x = 80;
        var y = 100;
       
        if(this.foodStock!=0){
            for(var i = 0;i<foodS;i++){
               
                if(i%10==0){
                    console.log(this.foodStock);
                    x=80;
                    y=y+50;
                }
                imageMode(CENTER);
                image(this.img,x,y,50,50);
                x = x + 30;
                
               
            }
        }
        // if(foodS!==0){

        //     var x1  = 80;
        //     var y1 = 100;
        //     for(var i=0;i<foodS;i++){


        //        button1.mousePressed(()=>{
        //            feedDog();
        //           for(var t=0; t>foodS;t++){
        //               if(foodS>milks.length){
        //                 milks.get(t).destroy();
        //               }
        //           } 
        //        })
        //         if(i%10==0){
        //             x1 = 80;
        //             y1 += 80;
        //         }

        //         x1 += 50;
               
        //         milk = createSprite(x1,y1,70,70);
        //         milk.addImage(this.img);
        //         milk.scale= 0.1;
        //         milks.add(milk);
        //     }
            
        // }

    }
    getFoodStock(){
        var foodStockRef = database.ref('Food');
        foodStockRef.on("value",(data)=>{
            foodS = data.val();
        })
    }
    updateFoodStock(x){
        database.ref('/').update({
            Food : x
        })
    }
    deductFood(){

    }
    bedRoom(){
        gs=1;
       
    }
    washRoom(){
        gs=2;
      
    }
    garden(){
        gs=3;
       
    }
}

// getCount(){
//     var playerCountRef = database.ref('playerCount');
//     playerCountRef.on("value",(data)=>{
//       playerCount = data.val();
//     })
//   }
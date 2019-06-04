//initilize 
var T_Column = 20;
var T_Row = 15;

// Car
var CarX = 350; ///
var CarY = 300; ///
var canvas; ///
var canvasContext; ///
var trackGrid = new Array(T_Column, T_Row);
var CarSpeed = 0;
const Speed_Decay = 0.94;


var carAng = -0.5*Math.PI;


function initCar() {
  
    


    //// Bricks 
    Track();
    //// Ball Sprite
    Ball(CarX, CarY, 5, 'white'); //   
    // Car
    Car(carPIC, CarX, CarY, carAng);

    CarReset();
}

function CarMove() {
    //// Car movement
    if(HOLD_Accel == true) {
       CarSpeed += ACCEL_POW;

       if(HOLD_LeftT == true && CarSpeed >= MIN_TURN) {
           carAng += TURN_POW*Math.PI;
           
       }else{
           HOLD_LeftT = false;
       }
       if(HOLD_RightT == true && CarSpeed >= MIN_TURN) {
           carAng -= TURN_POW*Math.PI;
           
       }else{
           HOLD_RightT = false;
       }

   }else{
       HOLD_Accel = false;
       
   }
   if(HOLD_Rever == true) {
       CarSpeed -= REVER_POW;
       
       if(HOLD_LeftT == true && CarSpeed <= Math.abs(MIN_TURN)) {
           carAng -= TURN_POW*Math.PI;
           
       }else{
           HOLD_LeftT = false;
       }
       if(HOLD_RightT == true && CarSpeed <= Math.abs(MIN_TURN)) {
           carAng += TURN_POW*Math.PI;
           
       }else{
           HOLD_RightT = false;
       }
   }else{
       HOLD_Rever = false;
       
   }
   //CarX += Math.cos(carAng) * CarSpeed;
   //CarY += Math.sin(carAng) * CarSpeed;

   CarSpeed *= Speed_Decay;
    
   //Find car's next position
   var nextXPos = CarX + Math.cos(carAng) * CarSpeed;
   var nextYPos = CarY + Math.sin(carAng) * CarSpeed;

   if (TrackatPixelCheck(nextXPos, nextYPos)) {
       //Moves car to next position
       CarX = nextXPos;
       CarY = nextYPos;
   }else{
       //Halts car
       CarSpeed = -0.5*CarSpeed;
   }/// 

   

   TrackCordTOIndex(T_Column, T_Row);

   

   

   //Bounds(); ////



   
}
function Bounds() {
    //// Boundaries 
    if (CarX >= canvas.width) {
        BallXSpeed *= -1; ///
    }

    if (CarX <= 0) {
        BallXSpeed *= -1; ///
    }

    if (CarY >= canvas.height) {
        CarReset(); ////
    }

    if (CarY <= 0) {
        CarYSpeed *= -1; ////
    }
}

function CarReset() {
  
    // for-loop 
    for(var i = 0; i <= 299; i++) {
        if(trackGrid[i] == CarSpawn) {
            var TileRow = Math.floor(i/T_Column);
            var TileCol = i%T_Column;

            CarX = TileCol * T_Width + 0.5 * T_Width;
            CarY = TileRow * T_Height + 0.5 * T_Height;
            trackGrid[i] = TrackRoad;

           
            break;
        }
        document.getElementById("debugText").innerHTML = "Car Starting Tile: X:" + TileCol + ", Y:" + TileRow + "Current Car Corrdinates: X:" + CarX + ", Y:" + CarY;
    }
    
}
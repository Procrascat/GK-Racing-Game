////Variables 

// Car
var BallX = 350; ///
var BallY = 300; ///
var canvas; ///
var canvasContext; ///
var trackGrid = new Array(T_Column, T_Row);
var CarSpeed = 0;
const Speed_Decay = 0.94;
var carPIC = document.createElement("img");
var carPLoad = false;
var carAng = 0.0;

//Keys
const UPKEY = 38;
const LEFTKEY = 37;
const RIGHTKEY = 39;
const DOWNKEY = 40;
//// Keys being held down
var HOLD_Accel = false;
var HOLD_Rever = false;
var HOLD_LeftT = false;
var HOLD_RightT = false;
//Movement refinment 
const ACCEL_POW = 0.5;
const REVER_POW = 0.2;
const TURN_POW = 0.05;
const MIN_TURN = 0.3;
 
//Enviornment 
//Map Grid
var trackGrid = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; ///
const T_Width = 40;
const T_Height = 40;
const T_Gap = 1;
var T_Column = 20;
var T_Row = 15;
// this doesn't work and it upsets me.
var Music = new Audio("bachpiece.mp3");

//Debug
document.getElementById("debugText").innerHTML = "replacement text";

////////
////////

function keyPressed(evt) {
    document.getElementById("debugText").innerHTML = "KeyCode Pressed: " + evt.keyCode;
    //PlayMusic();
    //Acceleration
    //Takes key press from user(evt.keyCode) and compares it to a specific key(UPKEY, DOWNKEY, RIGHTKEY and LEFTKEY) needed to move car
    if(evt.keyCode == UPKEY) {
        HOLD_Accel = true;
    }else if(evt.keyCode == DOWNKEY) {
        HOLD_Rever = true;
    }
    
    //Turning
    if(evt.keyCode == RIGHTKEY && (HOLD_Accel == true || HOLD_Rever == true)) {
        HOLD_LeftT = true;
    }else if(evt.keyCode == LEFTKEY && (HOLD_Accel == true || HOLD_Rever == true)) {
        HOLD_RightT = true;
    }

    // Prevents default window scrolling
    evt.preventDefault(); 
}

function keyReleased(evt) {

    //Ceases any movement once key(evt.keyCode) is not pressed
    document.getElementById("debugText").innerHTML = "KeyCode Released: " + evt.keyCode;

    if(evt.keyCode == UPKEY) {
        HOLD_Accel = false;
        
    }else if(evt.keyCode == DOWNKEY) {
        HOLD_Rever = false;
    }
    
    
    
    if(evt.keyCode == RIGHTKEY) {
        HOLD_LeftT = false;
    }else if(evt.keyCode == LEFTKEY) {
        HOLD_RightT = false;
    }
}

window.onload = function() {
    
    canvas = document.getElementById('gameCanvas'); ////
    canvasContext = canvas.getContext('2d'); ////

    // loads car
    carPIC.onload = function() {
    carPLoad = true; // displays pic after loading
    }
    // Image recolored to green
    // Author: sheikh_tuhin (qubodup remix)(Submitted by qubodup) https://opengameart.org/content/red-car-top-down
    // Public domain asset
    carPIC.src = "player1(revised).png";
    //
    
    //Controls
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);

    var Framerate = 60;
    setInterval(function () {
        drawEverything();
        moveEverything();
    }, 1000 / Framerate);

    
}

function drawEverything() {

    //// Background 
    colorRect(0, 0, canvas.width, canvas.height, 'black'); //


    //// Bricks 
    Track();
    //// Ball Sprite
    Ball(BallX, BallY, 5, 'white'); //   
    // Car
    Car(carPIC, BallX, BallY, carAng);
    
}

function moveEverything() {
    //// Car movement
    if(HOLD_Accel == true) {
        CarSpeed += ACCEL_POW;
    }else{
        HOLD_Accel = false;
    }
    if(HOLD_Rever == true) {
        CarSpeed -= REVER_POW;
    }else{
        HOLD_Rever = false;
    }
    if(HOLD_LeftT == true) {
        
            carAng += TURN_POW*Math.PI;
        
    }else{
        HOLD_LeftT = false;
    }
    if(HOLD_RightT == true) {
        
            carAng -= TURN_POW*Math.PI;
        
    }else{
        HOLD_RightT = false;
    }
    BallX += Math.cos(carAng) * CarSpeed;
    BallY += Math.sin(carAng) * CarSpeed;

    
    //Bounds(); ////



    //TrackCheck(BallX, BallY); /// 

    TrackCordTOIndex(T_Column, T_Row);

    CarSpeed *= Speed_Decay;
}

function PlayMusic() {
    document.querySelector('button').addEventListener('click', function() {
        var context = new AudioContext();

        context = "bachpiece.mp3";
    });

   
}

/*function PauseMusic() {
    Music.pause();
}*/


function colorRect(Xpos, Ypos, TLength, TWidth, TColor) {
    canvasContext.beginPath();
    canvasContext.fillStyle = TColor;
    canvasContext.fillRect(Xpos, Ypos, TLength, TWidth); ///

    canvasContext.fill();
}

function Ball(CXpos, CYpos, Clength, CColor) {
    canvasContext.beginPath();
    canvasContext.fillStyle = CColor;
    canvasContext.arc(CXpos, CYpos, Clength, 0, Math.PI * 2, true); //

    canvasContext.fill();
}
function Car(Img, PosX, PosY, Ang) {
    if(carPLoad) {
        canvasContext.save();
        canvasContext.translate(PosX, PosY);
        canvasContext.rotate(Ang);
        canvasContext.drawImage(Img, -Img.width/2, -Img.height/2);
        canvasContext.restore();
    }
}
function Track() {

    for (var TrackCCord = 0; TrackCCord <= T_Column; TrackCCord++) { // adds brick in each column
        for (var TrackRCord = 0; TrackRCord <= T_Row; TrackRCord++) { // adds brick in each row
            if (TrackCord(TrackCCord, TrackRCord)) {
                var TrackX = TrackCCord * T_Width;
                var TrackY = TrackRCord * T_Height;
                /////Brick
                colorRect(TrackX, TrackY, (T_Width - T_Gap), (T_Height - T_Gap), 'blue'); //
            }
        }
    }
}

function TrackCord(TrackCCord, TrackRCord) {
    var TrackIndex = TrackCordTOIndex(TrackCCord, TrackRCord);
    return (trackGrid[TrackIndex] == 1);
}

function TrackCheck(BallX, BallY) {

    // XY Brick removing variables
    var RTrackX = BallX / T_Width;
    var RTrackY = BallY / T_Height;

    // Math.floor round to nearest whole number
    RTrackX = Math.floor(RTrackX);
    RTrackY = Math.floor(RTrackY);

    //checks if ball is within the range of a brick
    if (RTrackX < 0 || RTrackX >= T_Column ||
        RTrackY < 0 || RTrackY >= T_Row) {

        return false; //ends function to prevent array error
    }

    var TrackIndex = TrackCordTOIndex(RTrackX, RTrackY);

    if (trackGrid[TrackIndex] == 1) {

        var BallXPrev = BallX - BallXSpeed; ////
        var BallYPrev = BallY - BallYSpeed; /////
        var TrackCPrev = Math.floor(BallXPrev / T_Width); ////
        var TrackRPrev = Math.floor(BallYPrev / T_Height); /////
        var TestState = true;

        if (TrackCPrev != RTrackX) {
            var adjTrackIndex = TrackCordTOIndex(TrackCPrev, RTrackY);

            if (trackGrid[adjTrackIndex] != 1) {
                BallXSpeed *= -1; /////

                TestState = false;

            }
        }

        if (TrackRPrev != RTrackY) {
            var adjTrackIndex = TrackCordTOIndex(TrackRPrev, RTrackX);

            if (trackGrid[adjTrackIndex] != 1) {
                BallYSpeed *= -1; /////

                TestState = false;

            }
        }

        if (TestState) {
            BallXSpeed *= -1;
            BallYSpeed *= -1;
        }


        return;

    }
}

function TrackCordTOIndex(trackCol, trackRow) {
    if (trackRow >= 0) {
        return (trackCol + T_Column * trackRow);
    }
}


function Bounds() {
    //// Boundaries 
    if (BallX >= canvas.width) {
        BallXSpeed *= -1; ///
    }

    if (BallX <= 0) {
        BallXSpeed *= -1; ///
    }

    if (BallY >= canvas.height) {
        CarReset(); ////
    }

    if (BallY <= 0) {
        BallYSpeed *= -1; ////
    }
}

function CarReset() {
    BallX = (canvas.width / 2) + 50;
    BallY = canvas.height / 2;
}
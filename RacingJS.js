////Variables 




//// Keys being held down
var HOLD_Accel = false;
var HOLD_Rever = false;
var HOLD_LeftT = false;
var HOLD_RightT = false;
//Movement refinment 
const ACCEL_POW = 0.5;
const REVER_POW = 0.2;
const TURN_POW = 0.05;
const MIN_TURN = 0.2;
 
//Enviornment 

// this doesn't work and it upsets me.
var Music = new Audio("bachpiece.mp3");

//Debug
document.getElementById("debugText").innerHTML = "No Key Pressed";

////////
////////



window.onload = function() {
    
    canvas = document.getElementById('gameCanvas'); ////
    canvasContext = canvas.getContext('2d'); ////

    // loads car
    
    carPIC.onload = function() {
         // displays pic after loading
    }
    // Image recolored to green
    // Author: sheikh_tuhin (qubodup remix)(Submitted by qubodup) https://opengameart.org/content/red-car-top-down
    // Public domain asset
    carPIC.src = "player1(revised).png";
    //

    roadPIC.onload = function() {
        roadLoad = true;
    }
    roadPIC.src = "Road.png";

    wallPIC.onload = function() {
        wallLoad = true;
    }
    wallPIC.src = "GroundBoundary.png";
    
    //Controls
    initInput();
    

    LoadandCountImg();

    
}

function LoadingPreGame() {
    var Framerate = 30;
    setInterval(function () {
        console.log(CarSpeed);
        drawEverything();
        moveEverything();
    }, 1000 / Framerate);
}

function drawEverything() {

    initCar();
    
}

function moveEverything() {
    
   CarMove();

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








//Variables 
var ImgCounter = 3;
var carPIC = document.createElement("img");
var wallPIC = document.createElement("img");
var roadPIC = document.createElement("img");

//functions 
function LoadandCountImg() {
    ImgCounter -= 1;
    if(ImgCounter >= 0) {
        LoadingPreGame();
    }
}
function ImgLoad() {
    carPIC.onload = LoadandCountImg;
    carPIC.src = "player1.png";
    wallPIC.onload = LoadandCountImg;
    wallPIC.src = "GroundBoundary.png";
    roadPIC.onload = LoadandCountImg; 
    roadPIC.src = "Road.png";


}
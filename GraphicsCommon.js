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
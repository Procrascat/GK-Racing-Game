//Map Grid
var trackGrid =    [    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,1,    1,    1,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    1,    1,1,    1,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    1,1,    0,    0,    0,    0,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    0,    0,    0,    1,1,    0,    0,    0,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    0,    0,    1,1,    0,    0,    1,    1,    0,    0,    1,    1,    1,    1,    1,    0,    0,    0,    1,    1,    0,    0,    1,1,    0,    0,    1,    0,    0,    0,    0,    1,    1,    1,    0,    0,    0,    0,    0,    1,    0,    0,    1,1,    0,    0,    1,    0,    0,    0,    0,    0,    1,    1,    0,    0,    0,    0,    0,    1,    0,    0,    1,1,    0,    0,    1,    0,    0,    0,    0,    0,    0,    1,    0,    0,    1,    0,    0,    1,    0,    0,    1,1,    0,    0,    1,    0,    0,    1,    0,    0,    0,    1,    0,    0,    1,    0,    0,    1,    0,    0,    1,1,    0,    2,    1,    0,    0,    1,    1,    0,    0,    0,    0,    0,    1,    0,    0,    1,    0,    0,    1,    1,    1,    1,    1,    0,    0,    1,    1,    0,    0,    0,    0,    0,    1,    0,    0,    0,    0,    0,    1,1,    0,    0,    0,    0,    0,    1,    1,    1,    0,    0,    0,    1,    1,    0,    0,    0,    0,    0,    1,1,    0,    0,    0,    0,    0,    1,    1,    1,    1,    1,    1,    1,    1,    1,    0,    0,    0,    1,    1,1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1]; ///
const TrackRoad = 0;
const TrackWall = 1;
const CarSpawn = 2;
const T_Width = 40;
const T_Height = 40;

var T_Column = 20;
var T_Row = 15;



function Track() {

    for (var TrackCCord = 0; TrackCCord <= T_Column; TrackCCord++) { // adds brick in each column
        for (var TrackRCord = 0; TrackRCord <= T_Row; TrackRCord++) { // adds brick in each row
            var TrackX = TrackCCord * T_Width;
            var TrackY = TrackRCord * T_Height;
            if (TrackWallCord(TrackCCord, TrackRCord)) {
                
                //Draw wall image
                canvasContext.drawImage(wallPIC, TrackX, TrackY);
                /////Brick
                
            }else{
                canvasContext.drawImage(roadPIC, TrackX, TrackY);
            }
        }
    }
}

function TrackWallCord(TrackCCord, TrackRCord) {
    var TrackIndex = TrackCordTOIndex(TrackCCord, TrackRCord);
    return (trackGrid[TrackIndex] == TrackWall);
}

function TrackatPixelCheck(CarX, CarY) {

    

    // XY Brick removing variables
    var RTrackX = CarX / T_Width;
    var RTrackY = CarY / T_Height;

    // Math.floor round to nearest whole number
    RTrackX = Math.floor(RTrackX);
    RTrackY = Math.floor(RTrackY);

    //checks if ball is within the range of a brick
    if (RTrackX < 0 || RTrackX >= T_Column ||
        RTrackY < 0 || RTrackY >= T_Row) {

        return false; //ends function to prevent array error
    }else{

        var TrackIndex = TrackCordTOIndex(RTrackX, RTrackY);

        console.log(trackGrid[TrackIndex] == TrackRoad);
        return(trackGrid[TrackIndex] == TrackRoad); 
    }

    
    /*
        var BallXPrev = CarX - BallXSpeed; ////
        var CarYPrev = CarY - CarYSpeed; /////
        var TrackCPrev = Math.floor(BallXPrev / T_Width); ////
        var TrackRPrev = Math.floor(CarYPrev / T_Height); /////
        var TestState = true;

        if (TrackCPrev != RTrackX) {
            var adjTrackIndex = TrackCordTOIndex(TrackCPrev, RTrackY);

            if (trackGrid[adjTrackIndex] != TrackWall) {
                BallXSpeed *= -1; /////

                TestState = false;

            }
        }

        if (TrackRPrev != RTrackY) {
            var adjTrackIndex = TrackCordTOIndex(TrackRPrev, RTrackX);

            if (trackGrid[adjTrackIndex] != TrackWall) {
                CarYSpeed *= -1; /////

                TestState = false;

            }
        }

        if (TestState) {
            BallXSpeed *= -1;
            CarYSpeed *= -1;
        }


        return;
    */
    
}

function TrackCordTOIndex(trackCol, trackRow) {
    if (trackRow >= 0) {
        return (trackCol + T_Column * trackRow);
    }
}
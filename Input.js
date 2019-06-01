//Keys
const UPKEY = 38;
const LEFTKEY = 37;
const RIGHTKEY = 39;
const DOWNKEY = 40;


function initInput() {
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
}

function keyPressed(evt) {
    document.getElementById("debugText").innerHTML = "KeyCode Pressed: " + evt.keyCode;
    
    //PlayMusic();
    KeyState(evt.keyCode, true);
    // Prevents default window scrolling
    evt.preventDefault(); 
}

function keyReleased(evt) {

    //Ceases any movement once key(evt.keyCode) is not pressed
    document.getElementById("debugText").innerHTML = "KeyCode Released: " + evt.keyCode;

    KeyState(evt.keyCode, false);

    
}
function KeyState(UserKey, KeyBool) {
    //Acceleration
    //Takes key press from user(evt.keyCode) and compares it to a specific key(UPKEY, DOWNKEY, RIGHTKEY and LEFTKEY) needed to move car
    if(UserKey == UPKEY) {
        HOLD_Accel = KeyBool;
    }else if(UserKey == DOWNKEY) {
        HOLD_Rever = KeyBool;
    }
    
    //Turning
    if(UserKey == RIGHTKEY /*&& (HOLD_Accel == true || HOLD_Rever == true)*/) {
        HOLD_LeftT = KeyBool;
    }else if(UserKey == LEFTKEY /*&& (HOLD_Accel == true || HOLD_Rever == true)*/) {
        HOLD_RightT = KeyBool;
    }

    
}

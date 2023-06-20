var gamepadInfo;
var buttondisplay;
var axesdisplay;
var linear;
var angular;

const gamepadAPI = {
  controller: {},
  //runs on connect event
  connect(evt) {
    gamepadAPI.controller = evt.gamepad;
    console.log('Gamepad connected')
    console.log(`InfoGamepad connected at index ${gamepadAPI.controller.index}: ${gamepadAPI.controller.id}. It has ${gamepadAPI.controller.buttons.length} buttons and ${gamepadAPI.controller.axes.length} axes.`);
    changeinfo("insert");
    vibrate();
  },
  //runs on disconnect event
  disconnect(evt) {
    delete gamepadAPI.controller;
    console.log('Gamepad disconnected.');
    changeinfo("remove");
  },
  update() {
    // Clear the buttons cache
    gamepadAPI.buttonsCache = [];
  
    // Move the buttons status from the previous frame to the cache
    for (let k = 0; k < gamepadAPI.buttonsStatus.length; k++) {
      gamepadAPI.buttonsCache[k] = gamepadAPI.buttonsStatus[k];
    }
  
    // Clear the buttons status
    gamepadAPI.buttonsStatus = [];
  
    // Get the gamepad object
    const c = gamepadAPI.controller || {};
  
    // Loop through buttons and push the pressed ones to the array
    const pressed = [];
    if (c.buttons) {
      for (let b = 0; b < c.buttons.length; b++) {
        if (c.buttons[b].pressed) {
          pressed.push(gamepadAPI.buttons[b]);
        }
      }
    }
  
    // Loop through axes and push their values to the array
    const axes = [];
    if (c.axes) {
      for (let a = 0; a < c.axes.length; a++) {
        axes.push(c.axes[a].toFixed(2));
      }
    }
  
    // Assign received values
    gamepadAPI.axesStatus = axes;
    gamepadAPI.buttonsStatus = pressed;
  
    // Return buttons for debugging purposes
    return pressed;
  },
  buttonPressed(button, hold) {
    let newPress = false;
  
    // Loop through pressed buttons
    for (let i = 0; i < gamepadAPI.buttonsStatus.length; i++) {
      // If we found the button we're looking for
      if (gamepadAPI.buttonsStatus[i] === button) {
        // Set the boolean variable to true
        newPress = true;
  
        // If we want to check the single press
        if (!hold) {
          // Loop through the cached states from the previous frame
          for (let j = 0; j < gamepadAPI.buttonsCache.length; j++) {
            // If the button was already pressed, ignore new press
            newPress = (gamepadAPI.buttonsCache[j] !== button);
          }
        }
      }
    }
    return newPress;
  },  
  buttons: ['A','B','Y','X',
  'LB','RB','Trigger-Left','Trigger-Right',
  'Back','Start','Power','LStick-Down','RStick-Down'],
  buttonsCache: [],
  buttonsStatus: [],
  axesStatus: [],
};


window.addEventListener("gamepadconnected", gamepadAPI.connect);
window.addEventListener("gamepaddisconnected", gamepadAPI.disconnect);

//main functions

window.onload = function() {
  gamepadInfo = document.getElementById("gamepad-info");
  buttondisplay = document.getElementById("btn-log");
  axesdisplay = document.getElementById("axs-log")
};

function changeinfo(type) {
  if(type == "insert") gamepadInfo.innerHTML = `Gamepad connected at index ${gamepadAPI.controller.index}: ${gamepadAPI.controller.id}. It has ${gamepadAPI.controller.buttons.length} buttons and ${gamepadAPI.controller.axes.length} axes.`;
  else gamepadInfo.innerHTML = `Gamepad disconnected. Waiting for reconnection...`;

}


setInterval(controlLoop, 15);
//main loop
function controlLoop() {
  gamepadAPI.update();
  
    if (gamepadAPI.buttonPressed("A", "hold")) {
      buttondisplay.innerHTML = `A`;
      console.log("A");
    }
    if (gamepadAPI.buttonPressed("B", "hold")) {
      buttondisplay.innerHTML = `B`;
      console.log("B")
    }
    if (gamepadAPI.buttonPressed("X", "hold")) {
      buttondisplay.innerHTML = `X`;
      console.log("X");
    }
    if (gamepadAPI.buttonPressed("Y", "hold")) {
      buttondisplay.innerHTML = "Y";
      console.log("Y");
    }
    if (gamepadAPI.buttonPressed("Trigger-Left", "hold")) {
      buttondisplay.innerHTML = "Trigger-Left";
      console.log("Trigger-Left");
    }
    if (gamepadAPI.buttonPressed("Trigger-Right", "hold")) {
      buttondisplay.innerHTML = "Trigger-Right";
      console.log("Trigger-Right");
    }
    if (gamepadAPI.buttonPressed("LStick-Down")) {
      buttondisplay.innerHTML = "LStick-Down";
      console.log("LStick-Down");
    }
    if (gamepadAPI.buttonPressed("RStick-Down")) {
      buttondisplay.innerHTML = "RStick-Down";
      console.log("RStick-Down");
    }
    if (gamepadAPI.buttonPressed("Start")) {
      buttondisplay.innerHTML = "Start";
      console.log("Start");
    }
    if (gamepadAPI.buttonPressed("Back")) {
      buttondisplay.innerHTML = "Back";
      console.log("Back");
    }
    if (gamepadAPI.buttonPressed("LB")) {
      buttondisplay.innerHTML = "LB";
      console.log("LB");
    }
    if (gamepadAPI.buttonPressed("RB")) {
      buttondisplay.innerHTML = "RB";
      console.log("RB");
    }
    if (gamepadAPI.buttonPressed("Power")) {
      buttondisplay.innerHTML = "Power";
      console.log("Power");
    }

    axestest();
}
//axes[0] = left stick horizontal; axes[1] = left stick vertical; axes[2] = left trigger; axes [3] = right stick horizontal; axes[4] = right stick vertical; axes[5] = right trigger; axes[6] = DPad horizontal; axes[7] = DPad vertical
 function axestest() {
  
  console.log(`LStick-horizontal: ${gamepadAPI.axesStatus[0]}, LStick-vertical: ${gamepadAPI.axesStatus[1]}, RStick-horizontal: ${gamepadAPI.axesStatus[3]}, RStick-vertical: ${gamepadAPI.axesStatus[4]}, Trigger-Left: ${gamepadAPI.axesStatus[2]}, Trigger-Right: ${gamepadAPI.axesStatus[5]}`);
  axesdisplay.innerHTML = `LStick-horizontal: ${gamepadAPI.axesStatus[0]}, LStick-vertical: ${gamepadAPI.axesStatus[1]}, RStick-horizontal: ${gamepadAPI.axesStatus[3]}, RStick-vertical: ${gamepadAPI.axesStatus[4]}, Trigger-Left: ${gamepadAPI.axesStatus[2]}, Trigger-Right: ${gamepadAPI.axesStatus[5]},`;
}

function vibrate() {
  console.log("vibrating");
  navigator.vibrate(200);
}




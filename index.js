var gamepadInfo;
var gp;
var buttondisplay;

const gamepadAPI = {
  controller: {},
  //runs on connect event
  connect(evt) {
    gamepadAPI.controller = evt.gamepad;
    console.log('Gamepad connected')
    console.log(`InfoGamepad connected at index ${gamepadAPI.controller.index}: ${gamepadAPI.controller.id}. It has ${gamepadAPI.controller.buttons.length} buttons and ${gamepadAPI.controller.axes.length} axes.`);
    changeinfo("insert");

  },
  //runs on disconnect event
  disconnect(evt) {
    delete gamepadAPI.controller;
    console.log('Gamepad disconnected.');
    changeinfo("remove");
  },
  //updates the controller every frame
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
  //checks for pressed buttons
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
  buttons: ['DPad-Up','DPad-Down','DPad-Left','DPad-Right',
  'Start','Back','Axis-Left','Axis-Right',
  'LB','RB','Power','A','B','X','Y',],
  buttonsCache: [],
  buttonsStatus: [],
  axesStatus: [],
};


window.addEventListener("gamepadconnected", gamepadAPI.connect);
window.addEventListener("gamepaddisconnected", gamepadAPI.disconnect);








//main functions

window.onload = function() {
  gamepadInfo = document.getElementById("gamepad-info");
  buttondisplay = document.getElementById("button-display");
};

function changeinfo(type) {
  if(type == "insert") gamepadInfo.innerHTML = `Gamepad connected at index ${gamepadAPI.controller.index}: ${gamepadAPI.controller.id}. It has ${gamepadAPI.controller.buttons.length} buttons and ${gamepadAPI.controller.axes.length} axes.`;
  else gamepadInfo.innerHTML = `Gamepad disconnected. Waiting for reconnection...`;


}

function displaybuttons() {
  var i = gamepadAPI.buttonsStatus;
  console.log(i);
  
    if (gamepadAPI.buttonPressed('A', 'hold')) {
      buttondisplay = "A";
      console.log("a");
    }
    if (gamepadAPI.buttonPressed('B', 'hold')) {
      buttondisplay = "B";
      console.log("b");

    }
  
}

setInterval(controlLoop, 3000);
//main loop
function controlLoop() {
  const gp = navigator.getGamepads()[0];
  console.log('1');
  displaybuttons();


}




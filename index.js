var gamepadInfo;
let batteryIsCharging = false;


const gamepadAPI = {
  controller: {},
  turbo: false,
  connect() {},
  disconnect() {},
  update() {},
  buttonPressed() {},
  buttons: [],
  buttonsCache: [],
  buttonsStatus: [],
  axesStatus: [],
};

buttons: [
  'DPad-Up','DPad-Down','DPad-Left','DPad-Right',
  'Start','Back','Axis-Left','Axis-Right',
  'LB','RB','Power','A','B','X','Y',
],


window.onload = function() {
    gamepadInfo = document.getElementById("gamepad-info");

};
  
window.addEventListener("gamepadconnected", function(event) {
  var gp = navigator.getGamepads()[0];
  gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";

});

window.addEventListener("gamepaddisconnected", function(event) {
  gamepadAPI.turbo = false;
  delete gamepadAPI.controller;
  gamepadInfo.innerHTML = "Waiting for gamepad.";

});

function buttonPressed(button, hold) {
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
}




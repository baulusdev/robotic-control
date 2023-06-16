var gamepadInfo;
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
  buttondisplay = document.getElementById("btn-log");
};

function changeinfo(type) {
  if(type == "insert") gamepadInfo.innerHTML = `Gamepad connected at index ${gamepadAPI.controller.index}: ${gamepadAPI.controller.id}. It has ${gamepadAPI.controller.buttons.length} buttons and ${gamepadAPI.controller.axes.length} axes.`;
  else gamepadInfo.innerHTML = `Gamepad disconnected. Waiting for reconnection...`;

}


setInterval(controlLoop, 3000);
//main loop
function controlLoop() {
  console.log(gamepadAPI.controller.buttonPressed());



}




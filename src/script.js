// Modules
const { ipcRenderer, ipcMain } = require("electron");
const robot = require("robotjs");
const appLoopIntervalDuration = 60;
let numActiveGamepads = 0;
var gamepadAPI = {
    controller: {},
    turbo: false,
    connect: function() {},
    disconnect: function() {},
    update: function() {},
    buttonPressed: function() {},
    buttons: [],
    buttonsCache: [],
    buttonsStatus: [],
    axesStatus: []
  };

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("openSettings").addEventListener("click", (e) => {
        console.log("hello world")
    });
});


// Event listeners
window.addEventListener("gamepadconnected", function(e) {
    numActiveGamepads++;
    let controllerList = document.getElementById("controllerList");
    let controllerNames = [];
    let controllerButtons = 0;
    controllerNames.push(e.gamepad.id);
    if (numActiveGamepads == 1) { 
        gpCountString = " Controller";
    } else { 
        gpCountString = " Controllers";
    }
    document.getElementById("currentControllerCount").innerText = numActiveGamepads + gpCountString;
    document.getElementById("gamepad_directions").remove();
    tellServer(`Gamepad connected at index ${e.gamepad.index}: ${e.gamepad.id}. ${e.gamepad.buttons.length} buttons, ${e.gamepad.axes.length} axes.`)
    console.log(`Gamepad connected at index gp${e.gamepad.index}: ${e.gamepad.id}. ${e.gamepad.buttons.length} buttons, ${e.gamepad.axes.length} axes.`)
    updateControllerInfo(e.gamepad.id, e.gamepad.index, e.gamepad.buttons.length, e.gamepad.axes.length);
});

window.addEventListener("gamepaddisconnected", (e) => {
    document.getElementById("currentControllerCount").innerText = numActiveGamepads + gpCountString;
    tellServer("Gamepad disconnected");
    updateControllerInfo(null, null, null, false)
});

function updateControllerInfo(controllerName, controllerIndex, controllerButtons, controllerAxes, connnectionStatus) {
    connnectionStatus ? numActiveGamepads++:numActiveGamepads--
    let appLogic = setInterval(logicLoop, 500);
    switch(numActiveGamepads) {
        case 0:
            for (let i = 0; i < numActiveGamepads; i++) {
                document.getElementById("gp" + i).style.display = "none";
            }
            break;
        case 1:
            break;
    }
}

// Functions
function tellServer(string) {
    ipcRenderer.send("clientMsg", string);
}

function convertControllerName(gpName) {
    switch(gpName) {
        case "Xbox 360 Controller (XInput STANDARD GAMEPAD)":
            return "Xbox One Controller";
            break;
    }
}

function logicLoop() {
    var mouse = robot.getMousePos();
    if (navigator.getGamepads()["0"].axes[0] >= 0.5) {
        robot.moveMouseSmooth(mouse.x, mouse.y - 10);
    }
}


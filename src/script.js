// window.onload = () => {
// }

// Modules
const { ipcRenderer } = require("electron");
const robot = require("robotjs");

// Events
window.addEventListener("gamepadconnected", function(e) {
    document.getElementById("gamepad_directions").remove();
    tellServer(`Gamepad connected at index ${e.gamepad.index}: ${e.gamepad.id}. ${e.gamepad.buttons.length} buttons, ${e.gamepad.axes.length} axes.`)
    let controllerInfo = document.createElement("p");
    let text = document.createTextNode(`${e.gamepad.id}`);
    controllerInfo.appendChild(text);
    document.getElementById("controllerList").appendChild(controllerInfo);
});

// window.addEventListener("gamepad")

// Functions
function tellServer(string) {
    ipcRenderer.send("clientMsg", string);
}


window.addEventListener("DOMContentLoaded", () => {
    controllerList = document.getElementById("controllerList")
    main = document.getElementsByTagName("main")[0];
})
// Modules
const { ipcRenderer, ipcMain } = require("electron");
// const robot = require("robotjs");
let numActiveGamepads = 0;
let $gp = {
    gp1: {
        name: "Foobar"
    },
    gp2: {
        name: "Foobar"
    },
    gp3: {
        name: "Foobar"
    },
    gp4: {
        name: "Foobar"
    }
}


// Events
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
    // console.log(main, controllerList, controllerInfo)
    tellServer(`Gamepad connected at index ${e.gamepad.index}: ${e.gamepad.id}. ${e.gamepad.buttons.length} buttons, ${e.gamepad.axes.length} axes.`)
    console.log(`Gamepad connected at index gp${e.gamepad.index}: ${e.gamepad.id}. ${e.gamepad.buttons.length} buttons, ${e.gamepad.axes.length} axes.`)
    updateControllerInfo(e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length);
});

window.addEventListener("gamepaddisconnected", (e) => {
    numActiveGamepads--;
    document.getElementById("currentControllerCount").innerText = numActiveGamepads + gpCountString;
    tellServer("Gamepad disconnected");
});

function updateControllerInfo(controllerName, controllerButtons, controllerAxes) {
    switch(numActiveGamepads) {
        case 0:
            for (let i = 0; i < numActiveGamepads; i++) {
                document.getElementById("gp" + i).style.display = "none";
            }
            break;
        case 1:
            $gp.gp1.name = convertControllerName(controllerName);
            console.log($gp)
            document.querySelector("#gp1 .gpDisplayName").innerText = convertControllerName(controllerName);
            document.querySelector("#gp1 .gpButtonCount .buttons").innerText = controllerButtons;
            document.querySelector("#gp1 .gpButtonCount .axes").innerText = controllerAxes;

            document.getElementById("gp1").style.display = "block";
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
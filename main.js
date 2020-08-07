// Modules
const electron = require('electron');
const { app, BrowserWindow, ipcMain } = require('electron');

// Electron START
function createWindow () {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 500,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    
    // and load the index.html of the app.
    win.loadFile('index.html');
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);
// Electron END

console.log("Looking for connected controllers...");

ipcMain.on("clientMsg", (e, string) => {
    console.log(string);
});
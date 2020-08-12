// Modules
const electron = require('electron');
const { app, BrowserWindow, ipcMain, Menu, Tray } = require('electron');

app.allowRendererProcessReuse = true;
// Electron START
function createWindow () {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 500,
        height: 250,
        autoHideMenuBar: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    
    // and load the index.html of the app.
    win.loadFile('index.html');
    win.webContents.openDevTools();
}

function showSettings () {
    // Create the browser window.
    const settingsWin = new BrowserWindow({
        width: 500,
        height: 250,
        autoHideMenuBar: true,
        resizable: false,
        modal: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile('settings.html');
}

app.whenReady().then(createWindow).then(() => {
    let tray = null;
    tray = new Tray('src/img/icon.ico')
    const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
    ])
    tray.setToolTip(app.name + " " + app.getVersion())
    tray.setContextMenu(contextMenu)
}).catch((err) => {
    console.log("Unable to create tray" + err)
});
// Electron END

console.log("Looking for connected controllers...");

ipcMain.on("clientMsg", (e, string) => {
    console.log(string);
});

ipcMain.on("openSettings", (e) => {
    settingsWin.show()
});
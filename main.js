// Modules
const electron = require('electron');
const { app, BrowserWindow, ipcMain, Menu, Tray } = require('electron');

app.allowRendererProcessReuse = false;
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
    
    win.on('close', event=>{
        event.preventDefault(); //this prevents it from closing. The `closed` event will not fire now
        win.hide();
    })

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
        { label: 'Controller Settings', type: 'normal' },
        { label: 'Exit', type: 'normal', click() { app.exit() } }
    ])
    tray.setToolTip(app.name + " " + app.getVersion())
    tray.setContextMenu(contextMenu)
    // tray.addListener("double-click", () => {
    //     win.show();
    // })
}).catch((err) => {
    console.log("Unable to create tray" + err)
});
// Electron END

console.log("Looking for connected controllers...");

ipcMain.on("clientMsg", (e, string) => {
    console.log(string);
});

ipcMain.on("openSettings", (e) => {
    settingsWin.show();
});


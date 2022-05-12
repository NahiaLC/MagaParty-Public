const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require("fs");

let win;

function createWindow () {
    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        fullscreen: true,
        backgroundColor: '#333333',
        webPreferences: {
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, 'preload.js')
        },
        autoHideMenuBar: true,
        icon: 'images/logoMTK/logoMTK_2.png'
    })
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.on("toGetJSONS", (event, args) => {
    fs.readFile(path.join(app.getAppPath(),"json/"+args.file+".json"), 'utf8', (error, data) => { 
        switch (args.pipe){
            case "load": win.webContents.send("fromLoadJSONS", data); break; // menu: ajustes del juego
            case "update": win.webContents.send("fromGetJSONS", data); break; // menu: ajustes del juego
            case "gameLoad": win.webContents.send("fromSetJSONS", data); break; // juego: pre carga de datos
            case "timeLoad": win.webContents.send("fromSetTime", data); break; // juego: cargar tiempo global
            case "pregunta": win.webContents.send("fromSet_pregunta", data); break; // juego: cargar pregunta
            case "reaper": win.webContents.send("fromSet_reaper", data); break; // juego: cargar reaper
            case "musica": win.webContents.send("fromSet_musica", data); break; // juego: cargar musica
            case "silueta": win.webContents.send("fromSet_silueta", data); break; // juego: cargar silueta
            case "mimica": win.webContents.send("fromSet_mimica", data); break; // juego: cargar mimica
            case "vf": win.webContents.send("fromSet_vf", data); break; // juego: cargar vf
            case "cultjapo": win.webContents.send("fromSet_cultjapo", data); break; // juego: cargar cultJapo
            case "tabu": win.webContents.send("fromSet_tabu", data); break; // juego: cargar tabu
        }
    });
});
ipcMain.on("toSetJSONS", (event, args) => {
    fs.writeFile(path.join(app.getAppPath(),"json/"+args.file+".json"), JSON.stringify(args.data), err => {
        if (err) {
            console.log('Error writing file ', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
});
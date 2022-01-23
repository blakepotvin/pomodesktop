const { app, BrowserWindow, Menu, Tray } = require('electron')
const { dialog } = require('electron')

let win = null, blurhide = true;

function createWindow() {
    win = new BrowserWindow({
        width: 300,
        height: 400,
        frame: false,
        transparent: true,
        skipTaskbar: true,
        resizable: false,
        alwaysOnTop: true,
      })  
    win.loadFile('index.html')
    
    win.hide(); 

    win.addListener('blur', () => {
        if (blurhide) {
            win.hide();
        }
    })
}

function revealWindow() {
    win.show()
}



const contextMenu = Menu.buildFromTemplate([
{
    label: 'About',
    click() {
    dialog.showMessageBox({title: "PomoDesktop", type:"info", message: "A pomodoro app in your menubar. \nCreated by Prathik Murthy", buttons: ["Close"] });
    }
},
// {
//     type: 'separator'
// },
{
    label: 'Hide on Blur',
    type: 'checkbox',
    checked: true,
    click() {
        blurhide = !blurhide;
    }
},
{
    label: 'Quit',
    click() {
    app.quit();
    }
}
]);

app.whenReady().then(() => {
// createWindow()
    tray = new Tray('stopwatch.png')
    tray.setToolTip('PomoDesktop')
    tray.setContextMenu(contextMenu)
    createWindow();

    tray.addListener('click', () => {
        revealWindow();
    })

})


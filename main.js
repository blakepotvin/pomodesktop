const { app, BrowserWindow, Menu, Tray } = require('electron')
const { dialog } = require('electron')

let win = null, blurhide = true;

function createWindow() {

    var x, y;
    if (tray.getBounds().x - 300 < 0) {
        x = tray.getBounds().x + tray.getBounds().width 
    } else {
        x = tray.getBounds().x - 300 + tray.getBounds().width
    }

    if (tray.getBounds().y - 400 < 0) {
        y = tray.getBounds().y + tray.getBounds().height
    } else {
        y = tray.getBounds().y - 400
    }

    win = new BrowserWindow({
        width: 300,
        height: 400,
        frame: false,
        transparent: true,
        skipTaskbar: true,
        resizable: false,
        alwaysOnTop: true,
        x: x,
        y: y,
        // y: 50
      })  
    win.loadFile('index.html')
    
    // win.hide(); 

    win.addListener('blur', () => {
        if (blurhide) {
            win.hide()
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
    
    tray = new Tray('stopwatch.png')
    tray.setToolTip('PomoDesktop')
    tray.setContextMenu(contextMenu)

    // createWindow()
    
    console.log(tray.getBounds().x, tray.getBounds().y)
    tray.addListener('click', () => {
        // revealWindow();
        createWindow();
    })

})


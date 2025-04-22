
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('./ipcHandlers.cjs'); // just added

function createWindow() {
  const win = new BrowserWindow({
    width: 650,
    height: 870,
    resizable: false, // idea no resize?
    minWidth: 650,
    maxWidth: 650,
    minHeight: 870,
    maxHeight: 870,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // now using preload
      contextIsolation: true,                     
    },
  });

  win.loadURL('http://localhost:5173');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

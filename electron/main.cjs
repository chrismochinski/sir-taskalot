process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
require("./ipcHandlers.cjs");

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 850,
    resizable: false,
    minWidth: 600,
    maxWidth: 600,
    minHeight: 850,
    maxHeight: 850,
    frame: false,
    vibrancy: "under-window",
    titleBarStyle: "hidden",
    vibrancy: "under-window",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  win.loadURL("http://localhost:5173");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

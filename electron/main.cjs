process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
require("./ipcHandlers.cjs");
const { DIM } = require("../src/Globals/constants.ts");

// handle collapse "stamp" vs "full"
let mainWindow;
let isCollapsed = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: DIM.width,
    height: DIM.height,
    resizable: false,
    minWidth: DIM.stamp,
    maxWidth: DIM.width,
    minHeight: DIM.stamp, 
    maxHeight: DIM.height, 
    frame: false,
    vibrancy: "under-window",
    titleBarStyle: "hidden",
    vibrancy: "under-window",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  mainWindow.loadURL("http://localhost:5173");
}

// 🧠 Add IPC listener to toggle collapse
ipcMain.on("toggle-collapse", () => {
  if (!mainWindow) return;

  if (!isCollapsed) {
    console.log("MAIN.CJS COLLAPSING!");
    mainWindow.setBounds({ width: DIM.stamp, height: DIM.stamp });
  } else {
    console.log("MAIN.CJS EXPANDING!");
    mainWindow.setBounds({ width: DIM.width, height: DIM.height });
  }

  console.log("mainWindow:", mainWindow.getBounds());
  isCollapsed = !isCollapsed;

  console.log("isCollapsed:", isCollapsed);
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

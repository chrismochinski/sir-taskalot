process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
require("./ipcHandlers.cjs");

// handle collapse "stamp" vs "full"
let mainWindow;
let isCollapsed = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 650,
    resizable: false,
    minWidth: 120,
    maxWidth: 500,
    minHeight: 120, // WAS 500
    maxHeight: 650, // WAS 650
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
    mainWindow.setBounds({ width: 120, height: 120 });
  } else {
    console.log("MAIN.CJS EXPANDING!");
    mainWindow.setBounds({ width: 500, height: 650 });
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

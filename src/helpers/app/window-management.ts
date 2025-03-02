import { BrowserWindow } from "electron";
import path from "path";
import registerListeners from "../ipc/listeners-register";

const inDevelopment = process.env.NODE_ENV === "development";

let mainWindow: BrowserWindow;
let splashscreenWindow: BrowserWindow;

export function createMainWindow() {
  const preload = path.join(__dirname, "preload.js");
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: inDevelopment,
      contextIsolation: true,
      nodeIntegration: true,
      nodeIntegrationInSubFrames: false,

      preload: preload,
    },
    titleBarStyle: "hidden",
  });
  // here we are registering ipcMain handlers
  registerListeners(mainWindow);

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  mainWindow.on("ready-to-show", () => {
    if (splashscreenWindow) {
      splashscreenWindow.destroy();
    }
  });
}

export async function createSplashScreen() {
  const splashPreload = path.join(__dirname, `splash-preload.js`);
  splashscreenWindow = new BrowserWindow({
    width: 375,
    height: 420,
    transparent: true,
    backgroundColor: undefined,
    frame: false,
    closable: false,
    fullscreenable: false,
    movable: false,
    resizable: false,
    center: true,
    show: false,
    webPreferences: {
      preload: splashPreload,
    },
  });

  splashscreenWindow.once("ready-to-show", () => {
    splashscreenWindow.show();
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    splashscreenWindow.loadURL(
      `${MAIN_WINDOW_VITE_DEV_SERVER_URL}/splash.html`,
    );
  } else {
    splashscreenWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/splash.html`),
    );
  }
}

// busted as fuck
export function updateSplashScreenStatus(newStatus: string) {
  splashscreenWindow.webContents.send("update-splash-screen-status", newStatus);
}

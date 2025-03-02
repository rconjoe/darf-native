import {
  WIN_MINIMIZE_CHANNEL,
  WIN_MAXIMIZE_CHANNEL,
  WIN_CLOSE_CHANNEL,
} from "./window-channels";

// this function is called in preload.ts.
// it has the special preload global window object.
// handlers for these invocations are in the event listener files.
export function exposeWindowContext() {
  const { contextBridge, ipcRenderer } = window.require("electron");
  contextBridge.exposeInMainWorld("electronWindow", {
    minimize: () => ipcRenderer.invoke(WIN_MINIMIZE_CHANNEL),
    maximize: () => ipcRenderer.invoke(WIN_MAXIMIZE_CHANNEL),
    close: () => ipcRenderer.invoke(WIN_CLOSE_CHANNEL),
  });
}
// this means we have window.electron.minimize etc available in frontend
// it is the correct way to expose fcns, since you are exposing only
// specific invocations of ipcRenderer on a particular channel, rather
// than importing the entire ipcRenderer into the frontend (insecsure)

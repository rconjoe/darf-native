import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipcRenderer", {
  // @ts-expect-error not heavily used so proabably won't fix
  on: (channel, listener) => {
    ipcRenderer.on(channel, (_, data) => {
      listener(data);
    });
  },
});

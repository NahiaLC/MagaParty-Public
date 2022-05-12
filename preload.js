const { contextBridge, ipcRenderer} = require("electron");

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
});

contextBridge.exposeInMainWorld(
  "api", {
      send: (channel, data) => {
          // whitelist channels
          let validChannels = ["toGetJSONS", "toSetJSONS"];
          if (validChannels.includes(channel)) {
              ipcRenderer.send(channel, data);
          }
      },
      receive: (channel, func) => {
          let validChannels = ["fromLoadJSONS", "fromGetJSONS", "fromSetJSONS", "fromSetTime",
                              "fromSet_pregunta", "fromSet_reaper", "fromSet_musica", "fromSet_silueta",
                              "fromSet_mimica", "fromSet_vf", "fromSet_cultjapo", "fromSet_tabu"];
          if (validChannels.includes(channel)) {
              // Deliberately strip event as it includes `sender` 
              ipcRenderer.on(channel, (event, ...args) => func(...args));
          }
      }
  }
);
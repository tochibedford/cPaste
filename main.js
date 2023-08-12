const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let bluetoothPinCallback;
let selectBluetoothCallback;

function createMainWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.webContents.on(
    "select-bluetooth-device",
    (event, deviceList, callback) => {
      event.preventDefault();
      selectBluetoothCallback = callback;
      const result = deviceList[0];

      if (result) {
        callback(result.deviceId);
      } else {
      }
    }
  );

  ipcMain.on("cancel-bluetooth-request", (event) => {
    selectBluetoothCallback("");
  });

  ipcMain.on("bluetooth-pairing-response", (_, response) => {
    bluetoothPinCallback(response);
  });

  win.webContents.session.setBluetoothPairingHandler((details, callback) => {
    bluetoothPinCallback = callback;
    win.webContents.send("bluetooth-pairing-request", details);
  });

  win.loadFile("ui/index.html");
  return win;
}

app.whenReady().then(() => {
  const win = createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

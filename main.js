const { app, BrowserWindow } = require("electron");

function createMainWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 300,
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

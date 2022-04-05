import { app, BrowserWindow, systemPreferences } from "electron";
import path from "path";
import { pathToFileURL } from "url";
import appIpcMain from "./ipcMain";

const isDevelopment = process.env.NODE_ENV === "development";

function createWindow() {
	const win = new BrowserWindow({
		width: 500,
		height: 700,
		show: false,
		webPreferences: {
			nodeIntegration: false,
			// contextIsolation: false, // protect against prototype pollution
			contextIsolation: true, // protect against prototype pollution
			enableRemoteModule: false, // turn off remote
			preload: path.join(__dirname, 'preload.js')
		},
	}).once("ready-to-show", () => {
		win.show();
	});

	if (isDevelopment) {
		win.loadURL("http://localhost:3000");
		// win.webContents.toggleDevTools();
	} else {
		win.loadURL(
			pathToFileURL(path.join(__dirname, "./renderer/index.html")).toString()
		);
	}
	win.removeMenu();

	appIpcMain(win);

	// systemPreferences.on('accent-color-changed', (event, newColor) => {
	// 	console.log(`[theme] new Accent Color detected ${newColor}`);
	// 	win.webContents.send('fromAccentColor', newColor);
	// });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
	return;
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

import {SplitDirection} from "../../Enums";
import {remote} from "electron";


export function buildMenuTemplate(app: Electron.App, browserWindow: Electron.BrowserWindow): Electron.MenuItemOptions[] {
    const template: Electron.MenuItemOptions[] = [
        {
            label: "Black Screen",
            submenu: [
                {
                    label: "About Black Screen",
                    role: "about",
                },
                {
                    type: "separator",
                },
                {
                    label: "Hide Black Screen",
                    accelerator: "Command+H",
                    click: () => {
                        app.hide();
                    },
                },
                {
                    label: "Hide Others",
                    accelerator: "Alt+Command+H",
                    role: "hideothers",
                },
                {
                    type: "separator",
                },
                {
                    label: "Quit",
                    accelerator: "Command+Q",
                    click: () => {
                        app.quit();
                    },
                },
            ],
        },
        {
            label: "Edit",
            submenu: [
                {
                    label: "Undo",
                    accelerator: "Command+Z",
                    role: "undo",
                },
                {
                    label: "Redo",
                    accelerator: "Shift+Command+Z",
                    role: "redo",
                },
                {
                    label: "Find",
                    accelerator: "Command+F",
                    click: () => {
                        (document.querySelector("input[type=search]") as HTMLInputElement).select();
                    },
                },
                {
                    type: "separator",
                },
                {
                    label: "Cut",
                    accelerator: "Command+X",
                    role: "cut",
                },
                {
                    label: "Copy",
                    accelerator: "Command+C",
                    role: "copy",
                },
                {
                    label: "Paste",
                    accelerator: "Command+V",
                    role: "paste",
                },
                {
                    label: "Select All",
                    accelerator: "Command+A",
                    role: "selectall",
                },
            ],
        },
        {
            label: "View",
            submenu: [
                {
                    label: "Reload",
                    accelerator: "Command+R",
                    click: () => {
                        browserWindow.reload();
                    },
                },
                {
                    label: "Toggle Full Screen",
                    accelerator: "Ctrl+Command+F",
                    click: () => {
                        browserWindow.setFullScreen(!browserWindow.isFullScreen());
                    },
                },
                {
                    label: "Toggle Developer Tools",
                    accelerator: "Alt+Command+I",
                    click: () => {
                        browserWindow.webContents.toggleDevTools();
                    },
                },
            ],
        },
        {
            label: "Window",
            submenu: [
                {
                    label: "Add Tab",
                    accelerator: "Command+t",
                    click: () => {
                        window.application.addTab();
                    },
                },
                {
                    label: "Split Horizontally",
                    accelerator: "Command+-",
                    click: () => {
                        window.focusedTab.addPane(SplitDirection.Horizontal);
                        window.application.forceUpdate();
                    },
                },
                {
                    label: "Split Vertically",
                    accelerator: "Command+\\",
                    click: () => {
                        window.focusedTab.addPane(SplitDirection.Vertical);
                        window.application.forceUpdate();
                    },
                },
            ],
        },
        {
            label: "Pane",
            submenu: [
                {
                    label: "Previous",
                    accelerator: "Command+k",
                    click: () => {
                        window.focusedTab.activatePreviousPane();
                        window.application.forceUpdate();
                    },
                },
                {
                    label: "Next",
                    accelerator: "Command+j",
                    click: () => {
                        window.focusedTab.activateNextPane();
                        window.application.forceUpdate();
                    },
                },
                {
                    label: "Close",
                    accelerator: "Command+w",
                    click: () => {
                        window.application.closeFocusedPane();
                        window.application.forceUpdate();
                    },
                },
            ],
        },
        {
            label: "Help",
            submenu: [
                {
                    label: "GitHub Repository",
                    click: () => {
                        /* tslint:disable:no-unused-expression */
                        remote.shell.openExternal("https://github.com/shockone/black-screen");
                    },
                },
            ],
        },
    ];
    return template;
}

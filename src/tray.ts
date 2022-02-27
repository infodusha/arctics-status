import {app, Menu, Tray} from 'electron';
import {getNotConnectedInfo} from './info';
import {getAssetPath} from './helpers';

export enum TRAY_ICON {
    NOT_CONNECTED = 'grey',
    CHARGE = 'blue',
    OK = 'green',
    WARN = 'yellow',
    BAD = 'red',
}

export interface TrayInfo {
    icon: TRAY_ICON;
    tooltip: string;
}

let tray: Tray;

export function initTray(): void {
    const info: TrayInfo = getNotConnectedInfo();
    tray = new Tray(getImagePath(info.icon));
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Exit', type: 'normal', click: handleExitClick },
    ]);
    tray.setContextMenu(contextMenu);
    tray.setToolTip(info.tooltip);
}

export function updateTrayInfo({ icon, tooltip }: TrayInfo) {
    tray.setImage(getImagePath(icon));
    tray.setToolTip(tooltip);
}

function handleExitClick(): void {
    app.quit();
}

function getImagePath(icon: TRAY_ICON): string {
    return getAssetPath(`icons/${icon}.png`);
}

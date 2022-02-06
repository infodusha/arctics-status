import {app, Menu, Tray} from 'electron';
import {getNotConnectedInfo} from './info';

export enum TRAY_ICON {
    NOT_CONNECTED = 'grey',
    OK = 'green',
    OK_CHARGE = 'green_charge',
    WARN = 'yellow',
    WARN_CHARGE = 'yellow_charge',
    BAD = 'red',
    BAD_CHARGE = 'red_charge',
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
    return `assets/icons/${icon}.ico`;
}

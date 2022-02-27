import {app, Menu, Tray} from 'electron';
import {getNotConnectedInfo} from './info';
import {getAssetPath} from './helpers';
import AutoLaunch from 'auto-launch';

const autoLauncher: AutoLaunch = new AutoLaunch({
    name: 'Arctics Status',
});

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

let isAutoLaunchEnabled: boolean;
let tray: Tray;

export async function initTray(): Promise<void> {
    isAutoLaunchEnabled = await autoLauncher.isEnabled();
    const info: TrayInfo = getNotConnectedInfo();
    tray = new Tray(getImagePath(info.icon));
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Launch on startup', type: 'checkbox', checked: isAutoLaunchEnabled, click: handleAutoLaunchToggle },
        { label: 'Exit', type: 'normal', click: handleExitClick },
    ]);
    tray.setContextMenu(contextMenu);
    tray.setToolTip(info.tooltip);
}

export function updateTrayInfo({ icon, tooltip }: TrayInfo) {
    tray.setImage(getImagePath(icon));
    tray.setToolTip(tooltip);
}

function handleAutoLaunchToggle(): void {
    autoLauncher[isAutoLaunchEnabled ? 'disable' : 'enable']().then(() => {
        isAutoLaunchEnabled = !isAutoLaunchEnabled;
    });
}

function handleExitClick(): void {
    app.quit();
}

function getImagePath(icon: TRAY_ICON): string {
    return getAssetPath(`icons/${icon}.png`);
}

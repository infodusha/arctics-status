import {BatteryInfo} from './headphones';
import {TRAY_ICON, TrayInfo} from './tray';

export function getTrayIcon(info: BatteryInfo): TRAY_ICON {
    if (info.isCharging) {
        return TRAY_ICON.CHARGE;
    }
    if (info.battery >= 50) {
        return TRAY_ICON.OK;
    }
    if (info.battery >= 20) {
        return TRAY_ICON.WARN;
    }
    return TRAY_ICON.BAD;
}

export function getTooltip(info: BatteryInfo): string {
    if (info.isCharging) {
        return 'Charging...';
    }
    return `${info.battery}%`;
}

export function getNotConnectedInfo(): TrayInfo {
    return {
        icon: TRAY_ICON.NOT_CONNECTED,
        tooltip: 'Not connected',
    }
}

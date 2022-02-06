import {BatteryInfo} from './headphones';
import {TRAY_ICON, TrayInfo} from './tray';

export function getTrayIcon(info: BatteryInfo): TRAY_ICON {
    if (info.battery >= 50) {
        return info.isCharging ? TRAY_ICON.OK_CHARGE : TRAY_ICON.OK;
    }
    if (info.battery >= 20) {
        return  info.isCharging ? TRAY_ICON.WARN_CHARGE : TRAY_ICON.WARN;
    }
    return info.isCharging ? TRAY_ICON.BAD_CHARGE : TRAY_ICON.BAD;
}

export function getTooltip(info: BatteryInfo): string {
    return `${info.battery}%${info.isCharging ? '. Charging...' : ''}`;
}

export function getNotConnectedInfo(): TrayInfo {
    return {
        icon: TRAY_ICON.NOT_CONNECTED,
        tooltip: 'Not connected',
    }
}

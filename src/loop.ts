import {BatteryInfo, Headphones} from './headphones';
import {updateTrayInfo} from "./tray";
import {getNotConnectedInfo, getTooltip, getTrayIcon} from './info';

export function loop(headphones: Headphones): void {
    const info: BatteryInfo | null | undefined = headphones.getBatteryInfo();

    const nextLoop = loop.bind(null, headphones);

    if (info === null) {
        updateTrayInfo(getNotConnectedInfo());
        setTimeout(nextLoop, 5000);
        return;
    }

    if (info === undefined) {
        setTimeout(nextLoop, 1000);
        return;
    }

    updateTrayInfo({
        icon: getTrayIcon(info),
        tooltip: getTooltip(info),
    });

    setTimeout(nextLoop, 1000);
}

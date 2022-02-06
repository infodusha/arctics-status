import {Headphones, headphonesList} from './headphones';
import {updateTrayInfo} from './tray';
import {Device, HID} from 'node-hid';
import {getNotConnectedInfo} from './info';
import {loop} from './loop';

let selectedHeadphones: Headphones;

export function start(): Headphones {
    const headphones: Headphones | null = getHeadphones();

    if (!headphones) {
        updateTrayInfo(getNotConnectedInfo());
        setTimeout(start, 10000);
        return;
    }

    const hid: HID | null = headphones.getHID();

    if (!hid) {
        updateTrayInfo(getNotConnectedInfo());
        setTimeout(start, 10000);
        return;
    }

    loop(headphones);
}

function getHeadphones(): Headphones | null {
    if (selectedHeadphones) {
        return selectedHeadphones;
    }
    for (const headphones of headphonesList) {
        const device: Device | null = headphones.getDevice();
        if (device) {
            selectedHeadphones = headphones;
            return selectedHeadphones;
        }
    }
    return null;
}

import * as nodeHid from 'node-hid';
import {Device, HID} from 'node-hid';

nodeHid.setDriverType('libusb');

const READ_TIMEOUT = 50;

const STEEL_SERIES_VENDOR_ID = 4152;
const REPORT_BYTE = 0x06;
const REPORT_BYTE_ANSWER = 170;
const CONNECTED_VALUE = 1;

export interface HeadphonesOptions {
    productId: number;
    usagePage: number;
    getBatteryByte: number;
    batteryByte: number;
    chargeByte: number;
}

export interface BatteryInfo {
    battery: number;
    isCharging: boolean;
}

export class Headphones {
    readonly vendorId = STEEL_SERIES_VENDOR_ID;

    private _hid?: HID;

    constructor(public readonly options: HeadphonesOptions) {}

    getDevice(): Device | null {
        const devices = nodeHid.devices(this.vendorId, this.options.productId);
        const device = devices.find((el) => el.usagePage === this.options.usagePage);
        if (!device) {
            return null;
        }
        return device;
    }

    getHID(): HID | null {
        if (this._hid) {
            return this._hid;
        }
        const device: Device | null = this.getDevice();
        if (!device) {
            return null;
        }
        this._hid = new nodeHid.HID(device.path);
        return this._hid;
    }

    getBatteryInfo(): BatteryInfo | null | undefined {
        this._hid.write([REPORT_BYTE, this.options.getBatteryByte]);
        const data: number[] = this._hid.readTimeout(READ_TIMEOUT);

        if (data[0] !== REPORT_BYTE_ANSWER) {
            // Skip result
            return undefined;
        }

        if (data[1] !== CONNECTED_VALUE) {
            return null;
        }

        const battery = convertBatteryToPercent(data[this.options.batteryByte]);
        const isCharging = Boolean(data[this.options.chargeByte]);
        return {battery, isCharging};
    }

    close(): void {
        this._hid.close();
    }
}

export const headphonesList = [
    new Headphones({
        // Arctics 9
        productId: 0x12c2,
        usagePage: 65472,
        getBatteryByte: 0x20,
        batteryByte: 3,
        chargeByte: 4,
    }),
]

export function closeHID(): void {
    headphonesList.forEach((headphones) => headphones.close());
}

function convertBatteryToPercent(value: number): number {
    return Math.round((value - 100) / 66 * 100);
}

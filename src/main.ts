import {app} from 'electron';
import {initTray} from './tray';
import {closeHID} from './headphones';
import {start} from './start';

app.disableHardwareAcceleration();

app.whenReady().then(() => initTray()).then(start);

app.on('before-quit', () => {
    closeHID();
});

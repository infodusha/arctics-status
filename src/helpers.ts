import {app} from 'electron';
import * as path from 'path';

export function getAssetPath(rootPath: string): string {
    if (app.isPackaged) {
        return path.resolve(process.resourcesPath, 'assets', rootPath);
    }
    return path.resolve('assets', rootPath);
}

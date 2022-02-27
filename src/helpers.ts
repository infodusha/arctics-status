import {app} from 'electron';
import path from 'path';

export function getAssetPath(rootPath: string): string {
    if (app.isPackaged) {
        return path.resolve(process.resourcesPath, 'assets', rootPath);
    }
    return path.resolve('assets', rootPath);
}

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const getFileStorage = (path: string) => join(__dirname, '../../storage/files', path);

export { __dirname, getFileStorage };

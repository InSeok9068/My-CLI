import { join } from 'path';

const getFileStorage = (path: string) => join(__dirname, '../../storage/files', path);

export { getFileStorage };

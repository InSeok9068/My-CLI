import { JSONFileSyncPreset } from 'lowdb/node';
import { join } from 'path';
import { DatabaseType } from '../types/table.type.js';
import { __dirname } from '../utils/path.util.js';

const db = JSONFileSyncPreset(join(__dirname, '../../', './storage/db.json'), {} as DatabaseType);

export default db;

import { JSONFileSyncPreset } from 'lowdb/node';
import { join } from 'path';
import { __dirname } from '../utils/path.util.js';

const defaultData = {
  infras: [],
  querys: [],
  snippets: [],
};

const db = JSONFileSyncPreset(join(__dirname, '../../', './storage/db.json'), defaultData);

export default db;

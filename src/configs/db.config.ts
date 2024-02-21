import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { join } from 'path';

const db = lowdb(new FileSync(join(__dirname, '../../', './storage/db.json')));

export default db;

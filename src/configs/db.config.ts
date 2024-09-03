import { JSONFileSyncPreset } from 'lowdb/node';
import { join } from 'path';
import { DatabaseType } from '../types/table.type.js';
import { __dirname } from '../utils/path.util.js';

const db = JSONFileSyncPreset(join(__dirname, '../../', './storage/db.json'), {} as DatabaseType);

export default db;

// Lodash로 리턴
// class LowSyncWithLodash<T> extends LowSync<T> {
//   chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data');
// }
// const db = new JSONFileSync<DatabaseType>(join(__dirname, '../../', './storage/db.json'));
// export default new LowSyncWithLodash(db, {} as DatabaseType);

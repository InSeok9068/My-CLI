import { select } from '@inquirer/prompts';
import fs from 'fs-extra';
import db from '../configs/db.config.js';
import { Table } from '../enums/table.enum.js';
import { InfraDB } from '../types/infra.type.js';
import { getFileStorage } from '../utils/path.util.js';

const infraAction = async () => {
  const answers = await select({
    message: '인프라',
    choices: db.data.infras.map((infra: InfraDB) => ({
      name: infra.name,
      value: infra.key,
    })),
  });

  console.log(fs.readFileSync(getFileStorage(`${Table.INFRAS}/${answers}.txt`), 'utf-8'));
};

export { infraAction };

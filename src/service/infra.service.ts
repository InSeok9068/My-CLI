import fs from 'fs-extra';
import inquirer from 'inquirer';
import db from '../configs/db.config';
import { TABLE_ENUM } from '../enums/table.enum';
import { InfraDB } from '../types/infra.type';
import { getFileStorage } from '../utils/path.util';

const infraAction = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'key',
      message: '인프라',
      choices: db
        .get(TABLE_ENUM.INFRAS)
        .value()
        .map((infra: InfraDB) => ({
          name: infra.name,
          value: infra.key,
        })),
    },
  ]);

  console.log(fs.readFileSync(getFileStorage(`${TABLE_ENUM.INFRAS}/${answers.key}.txt`), 'utf-8'));
};

export { infraAction };

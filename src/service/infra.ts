import { select } from '@inquirer/prompts';
import fs from 'fs-extra';
import db from '../configs/db.config.js';
import { marked } from '../configs/marked.config.js';
import { getFileStorage } from '../utils/path.util.js';

const infraAction = async () => {
  const answer = await select({
    message: '쿼리',
    choices: db.data.infras.map((infra) => ({
      name: infra.name,
      value: infra.key,
    })),
  });

  const infra = db.data.infras.find((infra) => infra.key === answer)!;

  if (infra.isFile) {
    console.log(marked.parse(fs.readFileSync(getFileStorage(infra.filePath!), 'utf-8')));
  } else {
    console.log(infra.value);
  }
};

export { infraAction };

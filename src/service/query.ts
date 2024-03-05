import { input, select } from '@inquirer/prompts';
import fs from 'fs-extra';
import isEmpty from 'validator/lib/isEmpty.js';
import db from '../configs/db.config.js';
import { marked } from '../configs/marked.config.js';
import { getFileStorage } from '../utils/path.util.js';

const queryAction = async () => {
  const answer = await select({
    message: '쿼리',
    choices: db.data.querys.map((query) => ({
      name: query.name,
      value: query.key,
    })),
  });

  const query = db.data.querys.find((query) => query.key === answer)!;

  const answers: string[] = [];
  if (query.isFile) {
    if (query.params && query.params.length > 0) {
      for (let i = 0; i < query.params.length; i++) {
        const answer = await input({
          message: query.params[i].message,
          validate: function (value) {
            switch (query.params![i].type) {
              case 'string':
                return isEmpty(value);
              case 'number':
                return !isNaN(Number(value));
              default:
                return true;
            }
          },
          default: query.params[i].default,
        });
        answers.push(answer);
      }
    }

    let result = fs.readFileSync(getFileStorage(query.filePath!), 'utf-8');

    for (let i = 0; i < answers.length; i++) {
      result = result.replace(`#param${i + 1}`, answers[i]);
    }

    console.log(marked.parse(result));
  } else {
    console.log(query.value);
  }
};

export { queryAction };

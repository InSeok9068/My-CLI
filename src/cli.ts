#! /usr/bin/env node

import { select } from '@inquirer/prompts';
import { program } from 'commander';
import figlet from 'figlet';
import db from './configs/db.config.js';
import { login, resetAuth } from './service/auth.js';
import { infraAction } from './service/infra.js';
import { palragoServerCheck } from './service/palrago-check.js';
import { queryAction } from './service/query.js';
import { Table } from './types/table.type.js';

console.log(figlet.textSync('LEE IN SEOK CLI'));

program
  .version('1.0.0')
  .description('이인석 CLI')
  .action(async () => {
    if (await login()) {
      const answer = await select({
        message: '선택해주세요!',
        choices: Object.keys(db.data)
          .filter((table) => table !== 'auth')
          .map((table) => ({
            name: table,
            value: table,
          })),
      });

      switch (answer) {
        case Table.INFRA:
          await infraAction();
          break;
        case Table.QUERY:
          await queryAction();
          break;
      }
    } else {
      process.exit(1);
    }
  });

program
  .command('reset')
  .requiredOption('-i, --id <id>', 'ID')
  .requiredOption('-p, --pw <pw>', 'PW')
  .action((options) => {
    resetAuth(options.id, options.pw);
  });

program.command('palrago check').action(() => palragoServerCheck());

program.parse(process.argv);

#! /usr/bin/env node

import { select } from '@inquirer/prompts';
import { program } from 'commander';
import figlet from 'figlet';
import db from './configs/db.config.js';
import { Table } from './enums/table.enum.js';
import { infraAction } from './service/infra.service.js';

console.log(figlet.textSync('LEE IN SEOK CLI'));

program
  .version('1.0.0')
  .description('이인석 CLI')
  .action(async () => {
    const answers = await select({
      message: '선택해주세요!',
      choices: Object.keys(db.data).map((table) => ({
        name: table,
        value: table,
      })),
    });

    switch (answers) {
      case Table.INFRAS:
        await infraAction();
        break;
    }
  });

program.parse(process.argv);

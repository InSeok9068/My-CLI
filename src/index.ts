#! /usr/bin/env node

import figlet from 'figlet';
import { program } from 'commander';
import inquirer from 'inquirer';
import db from './configs/db.config';
import { infraAction } from './service/infra.service';
import { TABLE_ENUM } from './enums/table.enum';

console.log(figlet.textSync('LEE IN SEOK CLI'));

program
  .version('1.0.0')
  .description('이인석 CLI')
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: '선택해주세요!',
        choices: db
          .keys()
          .value()
          .map((table) => ({
            name: table,
            value: table,
          })),
      },
    ]);

    switch (answers.type) {
      case TABLE_ENUM.INFRAS:
        await infraAction();
        break;
    }
  });

program.parse(process.argv);

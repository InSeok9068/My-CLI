import { input, password } from '@inquirer/prompts';
import chalk from 'chalk';
import isEmpty from 'validator/lib/isEmpty.js';
import db from '../configs/db.config.js';

const login = async () => {
  const auth = db.data.auth;

  if (!auth.ok) {
    const id = await input({
      message: '아이디를 입력해주세요.',
      validate: (value) => !isEmpty(value),
    });
    const pw = await password({
      message: '비밀번호 입력해주세요.',
      validate: (value) => !isEmpty(value),
    });
    if (auth.id !== id || auth.pw !== pw) {
      console.log(chalk.red(chalk.bold('인증이 실패하였습니다.')));
    } else {
      auth.ok = true;
      db.write();
    }
  }

  return auth.ok;
};

const resetAuth = (id: string, pw: string) => {
  const auth = db.data.auth;

  auth.id = id;
  auth.pw = pw;
  auth.ok = false;

  db.write();
  console.log(chalk.red(chalk.bold('계정 초기화가 완료되었습니다.')));
};

export { login, resetAuth };

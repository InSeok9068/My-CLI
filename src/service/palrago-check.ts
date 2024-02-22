import ora, { Ora } from 'ora';
import { ServerCheck } from '../types/server.type';

const servers: ServerCheck[] = [
  {
    name: 'API 1번 서버',
    url: 'http://192.168.1.192:8080/deployTime',
  },
  {
    name: 'API 2번 서버',
    url: 'http://192.168.1.193:8080/deployTime',
  },
  {
    name: 'WAS 1번 서버',
    url: 'http://192.168.1.195:8080/deployTime',
  },
  {
    name: 'WAS 2번 서버',
    url: 'http://192.168.1.196:8080/deployTime',
  },
  {
    name: 'BATCH 1번 서버',
    url: 'http://192.168.1.197:18101/deployTime',
  },
];

const spinners = new Map<string, Ora>();

const serverCheck = async (server: ServerCheck) => {
  let spinner = spinners.get(server.url);

  if (spinner) {
    spinner.text = `${server.name} 서버 CHECK`;
  } else {
    spinner = ora(`${server.name} 서버 CHECK`).start();
    spinners.set(server.url, spinner);
  }

  const response = await fetch(server.url);
  if (response.ok) {
    spinner.text = `${server.name} 서버 UP`;
  } else {
    spinner.text = `${server.name} 서버 DOWN`;
  }
};

const palragoServerCheck = async () => {
  servers.forEach((server) => {
    serverCheck(server);

    setInterval(() => {
      serverCheck(server);
    }, 1000);
  });
};

export { palragoServerCheck };

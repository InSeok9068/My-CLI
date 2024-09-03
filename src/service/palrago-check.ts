import { Listr } from 'listr2';
import { Env, ServerCheck } from '../types/server.type.js';

let servers: ServerCheck[] = [
  {
    name: 'API 1번 서버',
    url: 'http://192.168.1.192:8080/deployTime',
    env: 'prod',
  },
  {
    name: 'API 2번 서버',
    url: 'http://192.168.1.193:8080/deployTime',
    env: 'prod',
  },
  {
    name: 'WAS 1번 서버',
    url: 'http://192.168.1.195:8080/deployTime',
    env: 'prod',
  },
  {
    name: 'WAS 2번 서버',
    url: 'http://192.168.1.196:8080/deployTime',
    env: 'prod',
  },
  {
    name: 'BATCH 1번 서버',
    url: 'http://192.168.1.197:18101/deployTime',
    env: 'prod',
  },
  {
    name: 'API 서버',
    url: 'http://192.168.5.137:8080/deployTime',
    env: 'qa',
  },
  {
    name: 'WAS 서버',
    url: 'http://192.168.5.139:8080/deployTime',
    env: 'qa',
  },
];

const tasks = () => {
  return new Listr(
    servers.map((server) => ({
      title: server.name,
      task: async () => {
        let ok = await serverCheck(server);
        while (!ok) {
          ok = await serverCheck(server);
        }
      },
    })),
    {
      concurrent: true,
      exitOnError: false,
    },
  );
};

const serverCheck = async (server: ServerCheck) => {
  let ok = false;
  try {
    const response = await fetch(server.url);
    ok = response.ok;
  } catch {
    ok = false;
  }
  return ok;
};

const palragoServerCheck = async (env: Env) => {
  servers = servers.filter((server) => server.env === env);
  await tasks().run();
};

export { palragoServerCheck };

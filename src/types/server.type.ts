export interface ServerCheck {
  name: string;
  url: string;
  env: Env;
}

export type Env = 'prod' | 'qa';

export interface BaseTable {
  key: string;
  name: string;
  value: string | number | [];
  filePath?: string;
  isFile?: boolean;
  isNext?: boolean;
}

export interface Auth {
  id: string;
  pw: string;
  ok: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InfraTable extends BaseTable {}

export interface QueryTable extends BaseTable {
  params: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SnippetTable extends BaseTable {}

export interface DatabaseType {
  auth: Auth;
  infras: InfraTable[];
  querys: QueryTable[];
  snippets: SnippetTable[];
}

export const Table = {
  DEVELOP: 'develop',
  DEPLOY: 'deploy',
  INFRA: 'infras',
  QUERY: 'querys',
  SNIPPET: 'snippets',
} as const;
export type Table = (typeof Table)[keyof typeof Table];

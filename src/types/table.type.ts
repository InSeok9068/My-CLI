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

export interface InfraTable extends BaseTable {}

export interface QueryTable extends BaseTable {
  params?: QueryParam[];
}

export interface QueryParam {
  message: string;
  type: 'string' | 'number' | 'url';
  default: string;
}

export interface DatabaseType {
  auth: Auth;
  infras: InfraTable[];
  querys: QueryTable[];
}

export const Table = {
  INFRA: 'infras',
  QUERY: 'querys',
} as const;
export type Table = (typeof Table)[keyof typeof Table];

export const Table = {
  INFRAS: 'infras',
  QUERYS: 'querys',
  SNIPPETS: 'snippets',
} as const;
export type Table = (typeof Table)[keyof typeof Table];

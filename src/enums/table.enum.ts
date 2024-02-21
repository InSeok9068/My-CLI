export const Table = {
  INFRAS: 'infras',
} as const;
export type Table = (typeof Table)[keyof typeof Table];

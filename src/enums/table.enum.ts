export const TABLE_ENUM = {
  INFRAS: 'infras',
} as const;
export type TABLE_ENUM = (typeof TABLE_ENUM)[keyof typeof TABLE_ENUM];

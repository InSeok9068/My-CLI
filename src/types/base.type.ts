export interface BaseDB {
  key: string;
  name: string;
  value: string | number | [];
  filePath?: string;
  isFile?: boolean;
  isNext?: boolean;
}

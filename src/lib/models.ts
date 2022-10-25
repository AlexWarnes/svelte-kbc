export type KeyConfig = string | string[]

export interface KeyboardControl {
  name: string;
  keys: KeyConfig[];
}
export interface SpellResponse {
  type: string;
  version: string;
  data: { [key: string]: Spell };
}

export interface Spell {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: Datavalues;
  effect: Array<number[] | null>;
  effectBurn: Array<null | string>;
  vars: Var[];
  key: string;
  summonerLevel: number;
  modes: string[];
  costType: CostType;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: Image;
  resource: Resource;
}

export enum CostType {
  S = 's',
  SICooldown = 's %i:cooldown%',
}

export interface Datavalues {}

export interface Image {
  full: string;
  sprite: Sprite;
  group: Group;
  x: number;
  y: number;
  w: number;
  h: number;
}

export enum Group {
  Spell = 'spell',
}

export enum Sprite {
  Spell0PNG = 'spell0.png',
}

export enum Resource {
  CooldownSICooldown = '{{ cooldown }}s %i:cooldown%',
  ICooldownModifiedcooldownS = '%i:cooldown% {{ modifiedcooldown }}s',
}

export interface Var {
  link: string;
  coeff: number[] | number;
  key: string;
}

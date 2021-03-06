export interface Image {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Skin {
  id: string;
  num: number;
  name: string;
  chromas: boolean;
}

export interface Info {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

export interface Stats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
}

export interface Leveltip {
  label: string[];
  effect: string[];
}

export interface Var {
  link: string;
  coeff: number;
  key: string;
}

export interface Image2 {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Spell {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  leveltip: Leveltip;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: {};
  effect: number[][];
  effectBurn: string[];
  vars: Var[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: Image2;
  resource: string;
}

export interface Image3 {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Passive {
  name: string;
  description: string;
  image: Image3;
}

export interface Item {
  id: string;
  count: number;
  hideCount: boolean;
}

export interface Block {
  type: string;
  recMath: boolean;
  recSteps: boolean;
  minSummonerLevel: number;
  maxSummonerLevel: number;
  showIfSummonerSpell: string;
  hideIfSummonerSpell: string;
  appendAfterSection: string;
  visibleWithAllOf: string[];
  hiddenWithAnyOf: string[];
  items: Item[];
}

export interface Recommended {
  champion: string;
  title: string;
  map: string;
  mode: string;
  type: string;
  customTag: string;
  sortrank: number;
  extensionPage: boolean;
  customPanel?: any;
  blocks: Block[];
  useObviousCheckmark?: boolean;
  requiredPerk: string;
  priority?: boolean;
}

export interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  image: Image;
  skins: Skin[];
  lore: string;
  blurb: string;
  allytips: string[];
  enemytips: string[];
  tags: string[];
  partype: string;
  info: Info;
  stats: Stats;
  spells: Spell[];
  passive: Passive;
  recommended: Recommended[];
}

export interface Data {
  Champion: Champion;
}

export interface LoLResponse {
  type: string;
  format: string;
  version: string;
  data: Data;
}

export interface Datavalues {}

export interface Image {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SummonerBarrier {
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
  effect: number[][];
  effectBurn: string[];
  vars: any[];
  key: string;
  summonerLevel: number;
  modes: string[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: Image;
  resource: string;
}

export interface Datavalues2 {}

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

export interface SummonerBoost {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: Datavalues2;
  effect: number[][];
  effectBurn: string[];
  vars: Var[];
  key: string;
  summonerLevel: number;
  modes: string[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: Image2;
  resource: string;
}

export interface Datavalues3 {}

export interface Var2 {
  link: string;
  coeff: number[];
  key: string;
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

export interface SummonerDot {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: Datavalues3;
  effect: number[][];
  effectBurn: string[];
  vars: Var2[];
  key: string;
  summonerLevel: number;
  modes: string[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: Image3;
  resource: string;
}

export interface Datavalues4 {}

export interface Image4 {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SummonerExhaust {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: Datavalues4;
  effect: number[][];
  effectBurn: string[];
  vars: any[];
  key: string;
  summonerLevel: number;
  modes: string[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: Image4;
  resource: string;
}

export interface Datavalues5 {}

export interface Image5 {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SummonerFlash {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: Datavalues5;
  effect: number[][];
  effectBurn: string[];
  vars: any[];
  key: string;
  summonerLevel: number;
  modes: string[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: Image5;
  resource: string;
}

export interface Datavalues6 {}

export interface Var3 {
  link: string;
  coeff: number;
  key: string;
}

export interface Image6 {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SummonerHaste {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: Datavalues6;
  effect: number[][];
  effectBurn: string[];
  vars: Var3[];
  key: string;
  summonerLevel: number;
  modes: string[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: Image6;
  resource: string;
}

export interface Datavalues7 {}

export interface Var4 {
  link: string;
  coeff: number[];
  key: string;
}

export interface Image7 {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SummonerHeal {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: Datavalues7;
  effect: number[][];
  effectBurn: string[];
  vars: Var4[];
  key: string;
  summonerLevel: number;
  modes: string[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: Image7;
  resource: string;
}

export interface Datavalues8 {}

export interface Var5 {
  link: string;
  coeff: number[];
  key: string;
}

export interface Image8 {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SummonerMana {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: Datavalues8;
  effect: number[][];
  effectBurn: string[];
  vars: Var5[];
  key: string;
  summonerLevel: number;
  modes: string[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: Image8;
  resource: string;
}

export interface Datavalues9 {}

export interface Image9 {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SummonerPoroRecall {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: Datavalues9;
  effect: number[][];
  effectBurn: string[];
  vars: any[];
  key: string;
  summonerLevel: number;
  modes: string[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: Image9;
  resource: string;
}

export interface Datavalues10 {}

export interface Image10 {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SummonerPoroThrow {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: Datavalues10;
  effect: number[][];
  effectBurn: string[];
  vars: any[];
  key: string;
  summonerLevel: number;
  modes: string[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: Image10;
  resource: string;
}

export interface Datavalues11 {}

export interface Var6 {
  link: string;
  coeff: number[];
  key: string;
}

export interface Image11 {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SummonerSmite {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: Datavalues11;
  effect: number[][];
  effectBurn: string[];
  vars: Var6[];
  key: string;
  summonerLevel: number;
  modes: string[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: Image11;
  resource: string;
}

export interface Datavalues12 {}

export interface Image12 {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SummonerSnowURFSnowballMark {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: Datavalues12;
  effect: number[][];
  effectBurn: string[];
  vars: any[];
  key: string;
  summonerLevel: number;
  modes: string[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: Image12;
  resource: string;
}

export interface Datavalues13 {}

export interface Image13 {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SummonerSnowball {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: Datavalues13;
  effect: number[][];
  effectBurn: string[];
  vars: any[];
  key: string;
  summonerLevel: number;
  modes: string[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: Image13;
  resource: string;
}

export interface Datavalues14 {}

export interface Image14 {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SummonerTeleport {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: Datavalues14;
  effect: number[][];
  effectBurn: string[];
  vars: any[];
  key: string;
  summonerLevel: number;
  modes: string[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: Image14;
  resource: string;
}

export interface Data {
  SummonerBarrier: SummonerBarrier;
  SummonerBoost: SummonerBoost;
  SummonerDot: SummonerDot;
  SummonerExhaust: SummonerExhaust;
  SummonerFlash: SummonerFlash;
  SummonerHaste: SummonerHaste;
  SummonerHeal: SummonerHeal;
  SummonerMana: SummonerMana;
  SummonerPoroRecall: SummonerPoroRecall;
  SummonerPoroThrow: SummonerPoroThrow;
  SummonerSmite: SummonerSmite;
  SummonerSnowURFSnowball_Mark: SummonerSnowURFSnowballMark;
  SummonerSnowball: SummonerSnowball;
  SummonerTeleport: SummonerTeleport;
}

export interface SpellsResponse {
  type: string;
  version: string;
  data: Data;
}

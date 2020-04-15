export interface Id {
  $oid: string;
}

export interface Date {
  $numberLong: string;
}

export interface Pub {
  $date: Date;
}

export interface PRune {
  Domain: string;
  d1: string;
  d2: string;
  d3: string;
  d4: string;
}

export interface SRune {
  Domain: string;
  d1: string;
  d2: string;
}

export interface B1 {
  $numberInt: string;
}

export interface B2 {
  $numberInt: string;
}

export interface B3 {
  $numberInt: string;
}

export interface Bonus {
  b1: B1;
  b2: B2;
  b3: B3;
}

export interface Spells {
  first: string;
  second: string;
}

export interface ItemList {
  $numberInt: string;
}

export interface Item {
  groupName: string;
  itemList: ItemList[];
}

export interface Abilities {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  13: string;
  14: string;
  15: string;
  16: string;
  17: string;
  18: string;
}

export interface Threat {
  id: string;
  desc: string;
}

export interface Build {
  _id: Id;
  usrUID: string;
  champ: string;
  name: string;
  patch: string;
  pub: Pub;
  pRune: PRune;
  sRune: SRune;
  bonus: Bonus;
  spells: Spells;
  items: Item[];
  abilities: Abilities;
  threats: Threat[];
  description: string;
}

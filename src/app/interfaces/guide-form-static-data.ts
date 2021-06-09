export interface GuideFormStaticData {
  champions: Champion[];
  paths: Runes[];
  spells: Spell[];
  items: Item[];
}

export interface Champion {
  name: string;
  id: string;
}

export interface Spell {
  id: string;
  name: string;
}

export interface Runes {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: Slot[];
}

export interface Slot {
  runes: Rune[];
}

export interface Rune {
  id: number;
  key: string;
  icon: string;
  name: string;
  shortDesc: string;
  longDesc: string;
}

export interface Item {
  id: string;
  name: string;
}

export interface FullGuide {
  _id?: string;
  introduction: string;
  userUID: string;
  username: string;
  patch: string;
  createdOn: number;
  updatedOn?: number;
  name: string;
  champion: string;
  role: string;
  runes: Runes;
  runesDescription: string;
  bonus: Bonus;
  bonusDescription: string;
  spells: Spells;
  spellsDescription: string;
  itemsBlock: Items[];
  itemsDescription: string;
  abilitiesProgression: AbilitiesProgression;
  abilitiesProgressionDescription: string;
  threats: Threat[];
}
export interface Bonus {
  slotOne: BonusItem;
  slotTwo: BonusItem;
  slotThree: BonusItem;
}

export interface BonusItem {
  name: string;
  arrKey: string;
  icon: string;
}

export interface Spells {
  first: Spell;
  second: Spell;
}

export interface Spell {
  name: string;
  image: string;
  description: string;
}

export interface AbilitiesProgression {
  l1: string;
  l2: string;
  l3: string;
  l4: string;
  l5: string;
  l6: string;
  l7: string;
  l8: string;
  l9: string;
  l10: string;
  l11: string;
  l12: string;
  l13: string;
  l14: string;
  l15: string;
  l16: string;
  l17: string;
  l18: string;
}

export interface Items {
  itemRollName: string;
  itemArray: ItemArray[];
}

export interface ItemArray {
  name: string;
  image: string;
  description: string;
}

export interface Runes {
  primaryRune: string;
  primarySlots: ArySlots;
  secondaryRune: string;
  secondarySlots: ArySlots;
}

export interface ArySlots {
  first: Rune;
  second: Rune;
  third: Rune;
  fourth?: Rune;
}

export interface Rune {
  icon: string;
  name: string;
  description: string;
}

export interface Threat {
  threat: string;
  description: string;
}

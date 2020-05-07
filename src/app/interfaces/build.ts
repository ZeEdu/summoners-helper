export interface Guide {
  name: string;
  champion: string;
  role: string;
  createdOn: number;
  updatedOne: number;
  runes: Runes;
  itemsBlock: ItemsBlock[];
  abilitiesProgression: AbilitiesProgression;
  threats: Threat[];
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

export interface ItemsBlock {
  itemRollName: string;
  itemArray: ItemArray[];
}

export interface ItemArray {
  item: string;
}

export interface Runes {
  primaryRune: string;
  primarySlots: ArySlots;
  secondaryRune: string;
  secondarySlots: ArySlots;
}

export interface ArySlots {
  first: string;
  second: string;
  third: string;
  fourth?: string;
}

export interface Threat {
  threat: string;
  description: string;
}

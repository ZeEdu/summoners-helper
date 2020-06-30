export interface Guide {
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
   introduction: string;
   userUID: string;
   patch: string;
   _id?: string;
}
export interface Bonus {
   slotOne: string;
   slotTwo: string;
   slotThree: string;
}
export interface Spells {
   first: string;
   second: string;
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

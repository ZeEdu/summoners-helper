export interface FormItemsValues {
  itemsBlock: ItemsBlock[];
  itemsDescription: string;
}

export interface ItemsBlock {
  itemRollName: string;
  itemArray: ItemArray[];
}

export interface ItemArray {
  item: string;
}

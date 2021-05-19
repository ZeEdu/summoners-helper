export interface GetChampions {
  id: string;
  name: string;
  title: string;
  image: Image;
}

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
  Champion = 'champion',
}

export enum Sprite {
  Champion0PNG = 'champion0.png',
}

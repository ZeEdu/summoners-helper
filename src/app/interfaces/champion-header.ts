export interface ChampionHeader {
  id: string;
  key: string;
  name: string;
  title: string;
  image: Image;
}

export interface Image {
  full: string;
  sprite: string;
  group: string;
  x: H;
  y: H;
  w: H;
  h: H;
}

export interface H {
  $numberInt: string;
}

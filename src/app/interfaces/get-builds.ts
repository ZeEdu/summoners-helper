export interface Id {
  $oid: string;
}

export interface Builds {
  _id: Id;
  userUID: string;
  champion: string;
  name: string;
  patch: string;
}

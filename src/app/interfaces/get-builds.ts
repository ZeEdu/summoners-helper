export interface Id {
  $oid: string;
}

export interface Builds {
  _id: Id;
  usrUID: string;
  champ: string;
  name: string;
  patch: string;
}

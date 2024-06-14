import { User } from "./user";

export interface Activity {
  idActivite: number;
  animation: Animation;
  prixAct: number;
  dateAct: Date;
  dateAnnulationAct?: Date;
  etatActivite: string;
  encadrant: User;
}

export interface Animation {
  idAnimation: string;
  nomAnimation: string;
  dateCreationAnimation: Date;
  dureeAnimation: number;
  limiteAge: number;
  nbPlaceAnimation: number;
  descriptionAnimation: string;
  typeAnimation: string;
  difficulteAnimation: string;
}



export interface ActivityInserted {
  idActivite: number;
  animation: Animation;
  prixAct: number;
  dateAct: Date;
  dateAnnulationAct?: Date;
  etatActivite: string;
  id_encadrant: string;
}

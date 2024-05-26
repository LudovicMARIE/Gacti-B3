import { User } from "./user";

export interface Activity {
  idActivite: number;
  animation: Animation;
  prixAct: number;
  dateAct: Date;
  dateAnnulationAct: Date;
  etatActivite: String;
  encadrant: User;
}

export interface Animation {
    idAnimation: String;
    nomAnimation: String;
    dateCreationAnimation: Date;
    dureeAnimation: number;
    limiteAge: number;
    nbPlaceAnimation: number;
    descriptionAnimation: String;
    typeAnimation: String;
    difficulteAnimation: String;
}

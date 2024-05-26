import { Activity } from "./activity";

export interface User {
  idUser: String;
  mdp: String;
  nomCompte: String;
  prenomCompte: String;
  dateInscrip: Date;
  dateFerme: Date;
  typeProfil: String;
  dateDebSejour: Date;
  dateFinSejour: Date;
  adrMailCompte: String;
  telCompte: String;
  activites: Activity[];
}

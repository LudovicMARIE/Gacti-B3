import { Activity } from "./activity";

export interface User {
  idUser: string;
  mdp: string;
  nomCompte: string;
  prenomCompte: string;
  dateInscrip: Date;
  dateFerme: Date;
  typeProfil: string;
  dateDebSejour: Date;
  dateFinSejour: Date;
  adrMailCompte: string;
  telCompte: string;
  activites: Activity[];
}

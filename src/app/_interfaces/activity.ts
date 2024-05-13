export interface Activity {
    codeAnim: string;
    dateAct: Date;
    codeEtatAct: string;
    hrRdvAct: Date;
    prixAct: number;
    hrDebutAct?: Date;
    hrFinAct?: Date;
    dateAnnuleAct?: Date;
    nomResp: string;
    prenomResp: string;
    nomAnim: string;
}

export interface AnimationType {
    codeTypeAnim: string;
    nomTypeAnim: string;
}

export interface Animation {
    codeAnim: string;
    codeTypeAnim: string;
    nomAnim: string;
    dateCreationAnim: string;
    dateValiditeAnim: string;
    dureeAnim: number;
    limiteAge: number;
    tarifAnim: number;
    nbPlaceAnim: number;
    descriptAnim: string;
    commentAnim: string;
    difficulteAnim: string;

}
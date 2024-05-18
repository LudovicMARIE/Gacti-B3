package com.gactiapi.com.dto;

import java.util.Date;

public class CreateCompte {
  private String idUser;
  private String mdp;
  private String nomCompte;
  private String prenomCompte;
  private final Date dateInscrip;
  private Date dateFerme;
  private String typeProfil;
  private Date dateDebSejour;
  private Date dateFinSejour;
  private String adrMailCompte;
  private String telCompte;

  public CreateCompte(String idUser, String mdp, String nomCompte, String prenomCompte, Date dateDebSejour, Date dateFinSejour, String adrMailCompte, String telCompte) {
    this.idUser = idUser;
    this.mdp = mdp;
    this.nomCompte = nomCompte;
    this.prenomCompte = prenomCompte;
    this.dateInscrip = new Date();
    this.dateDebSejour = dateDebSejour;
    this.dateFinSejour = dateFinSejour;
    this.adrMailCompte = adrMailCompte;
    this.telCompte = telCompte;
  }

  public CreateCompte(String idUser, String mdp, String nomCompte, String prenomCompte, String typeProfil, Date dateDebSejour, Date dateFinSejour, String adrMailCompte, String telCompte) {
    this.idUser = idUser;
    this.mdp = mdp;
    this.nomCompte = nomCompte;
    this.prenomCompte = prenomCompte;
    this.dateInscrip = new Date();
    this.typeProfil = typeProfil;
    this.dateDebSejour = dateDebSejour;
    this.dateFinSejour = dateFinSejour;
    this.adrMailCompte = adrMailCompte;
    this.telCompte = telCompte;
  }

  public String getIdUser() {
    return idUser;
  }

  public String getMdp() {
    return mdp;
  }

  public String getNomCompte() {
    return nomCompte;
  }

  public String getPrenomCompte() {
    return prenomCompte;
  }

  public Date getDateInscrip() {
    return dateInscrip;
  }

  public Date getDateFerme() {
    return dateFerme;
  }

  public String getTypeProfil() {
    return typeProfil;
  }

  public Date getDateDebSejour() {
    return dateDebSejour;
  }

  public Date getDateFinSejour() {
    return dateFinSejour;
  }

  public String getAdrMailCompte() {
    return adrMailCompte;
  }

  public String getTelCompte() {
    return telCompte;
  }
}

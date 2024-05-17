package com.gactiapi.com.model;

import jakarta.persistence.Entity;

import java.util.Date;

@Entity
public class Compte {
  private String idUser;
  private String mdp;
  private String nomCompte;
  private String prenomCompte;
  private Date dateInscrip;
  private Date dateFerme;
  private String typeProfil;
  private Date dateDebSejour;
  private Date dateFinSejour;
  private String adrMailCompte;
  private String telCompte;

  public Compte() {
    this.dateInscrip = new Date();
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

  public void setMdp(String mdp) {
    this.mdp = mdp;
  }

  public void setNomCompte(String nomCompte) {
    this.nomCompte = nomCompte;
  }

  public void setPrenomCompte(String prenomCompte) {
    this.prenomCompte = prenomCompte;
  }

  public void setDateFerme(Date dateFerme) {
    this.dateFerme = dateFerme;
  }

  public void setTypeProfil(String typeProfil) {
    this.typeProfil = typeProfil;
  }

  public void setDateDebSejour(Date dateDebSejour) {
    this.dateDebSejour = dateDebSejour;
  }

  public void setDateFinSejour(Date dateFinSejour) {
    this.dateFinSejour = dateFinSejour;
  }

  public void setAdrMailCompte(String adrMailCompte) {
    this.adrMailCompte = adrMailCompte;
  }

  public void setTelCompte(String telCompte) {
    this.telCompte = telCompte;
  }
}

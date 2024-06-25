package com.gactiapi.com.dto;

import com.gactiapi.com.model.Activite;

import java.util.Date;
import java.util.List;

public class ReturnCompteDto {

  private String idUser;
  private String nomCompte;
  private String prenomCompte;
  private final Date dateInscrip;
  private Date dateFerme;
  private String typeProfil;
  private Date dateDebSejour;
  private Date dateFinSejour;
  private String adrMailCompte;
  private String telCompte;
  private List<Activite> activiteList;


  public ReturnCompteDto(){
    this.dateInscrip = new Date();
  }

  public ReturnCompteDto(String idUser, String nomCompte, String prenomCompte, Date dateDebSejour, Date dateFinSejour, String adrMailCompte, String telCompte, List<Activite> activiteList) {
    this.idUser = idUser;
    this.nomCompte = nomCompte;
    this.prenomCompte = prenomCompte;
    this.dateInscrip = new Date();
    this.dateDebSejour = dateDebSejour;
    this.dateFinSejour = dateFinSejour;
    this.adrMailCompte = adrMailCompte;
    this.telCompte = telCompte;
    this.activiteList = activiteList;
  }

  public ReturnCompteDto(String idUser, String nomCompte, String prenomCompte, String typeProfil, Date dateDebSejour, Date dateFinSejour, String adrMailCompte, String telCompte, List<Activite> activiteList) {
    this.idUser = idUser;
    this.nomCompte = nomCompte;
    this.prenomCompte = prenomCompte;
    this.dateInscrip = new Date();
    this.typeProfil = typeProfil;
    this.dateDebSejour = dateDebSejour;
    this.dateFinSejour = dateFinSejour;
    this.adrMailCompte = adrMailCompte;
    this.telCompte = telCompte;
    this.activiteList = activiteList;
  }

  public String getIdUser() {
    return idUser;
  }

  public void setIdUser(String idUser) {
    this.idUser = idUser;
  }

  public String getNomCompte() {
    return nomCompte;
  }

  public void setNomCompte(String nomCompte) {
    this.nomCompte = nomCompte;
  }

  public String getPrenomCompte() {
    return prenomCompte;
  }

  public void setPrenomCompte(String prenomCompte) {
    this.prenomCompte = prenomCompte;
  }

  public Date getDateInscrip() {
    return dateInscrip;
  }

  public Date getDateFerme() {
    return dateFerme;
  }

  public void setDateFerme(Date dateFerme) {
    this.dateFerme = dateFerme;
  }

  public String getTypeProfil() {
    return typeProfil;
  }

  public void setTypeProfil(String typeProfil) {
    this.typeProfil = typeProfil;
  }

  public Date getDateDebSejour() {
    return dateDebSejour;
  }

  public void setDateDebSejour(Date dateDebSejour) {
    this.dateDebSejour = dateDebSejour;
  }

  public Date getDateFinSejour() {
    return dateFinSejour;
  }

  public void setDateFinSejour(Date dateFinSejour) {
    this.dateFinSejour = dateFinSejour;
  }

  public String getAdrMailCompte() {
    return adrMailCompte;
  }

  public void setAdrMailCompte(String adrMailCompte) {
    this.adrMailCompte = adrMailCompte;
  }

  public String getTelCompte() {
    return telCompte;
  }

  public void setTelCompte(String telCompte) {
    this.telCompte = telCompte;
  }

  public List<Activite> getActiviteList() {
    return activiteList;
  }

  public void setActiviteList(List<Activite> activiteList) {
    this.activiteList = activiteList;
  }
}

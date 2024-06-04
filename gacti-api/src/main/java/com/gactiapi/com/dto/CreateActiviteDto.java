package com.gactiapi.com.dto;

import com.gactiapi.com.model.Animation;
import com.gactiapi.com.model.Compte;

import java.util.Date;

public class CreateActiviteDto {
  private Integer idActivite;
  private Animation animation;
  private Integer prixAct;
  private Date dateAct;
  private Date dateAnnulationAct;
  private String etatActivite;
  private String id_encadrant;

  public CreateActiviteDto() {
    this.etatActivite = "PREVUE";
  }

  public CreateActiviteDto(Integer idActivite, Animation animation, Integer prixAct, Date dateAct, Date dateAnnulationAct, String encadrant) {
    this.idActivite = idActivite;
    this.animation = animation;
    this.prixAct = prixAct;
    this.dateAct = dateAct;
    this.etatActivite = "PREVUE";
    this.dateAnnulationAct = dateAnnulationAct;
    this.id_encadrant = encadrant;
  }

  public CreateActiviteDto(Integer idActivite, Animation animation, Integer prixAct, Date dateAct, Date dateAnnulationAct, String etatActivite, String encadrant) {
    this.idActivite = idActivite;
    this.animation = animation;
    this.prixAct = prixAct;
    this.dateAct = dateAct;
    this.dateAnnulationAct = dateAnnulationAct;
    this.etatActivite = etatActivite;
    this.id_encadrant = encadrant;
  }



  public Integer getIdActivite() {
    return idActivite;
  }

  public void setIdActivite(Integer idActivite) {
    this.idActivite = idActivite;
  }

  public Animation getAnimation() {
    return animation;
  }

  public void setAnimation(Animation animation) {
    this.animation = animation;
  }

  public Integer getPrixAct() {
    return prixAct;
  }

  public void setPrixAct(Integer prixAct) {
    this.prixAct = prixAct;
  }

  public Date getDateAct() {
    return dateAct;
  }

  public void setDateAct(Date dateAct) {
    this.dateAct = dateAct;
  }

  public Date getDateAnnulationAct() {
    return dateAnnulationAct;
  }

  public void setDateAnnulationAct(Date dateAnnulationAct) {
    this.dateAnnulationAct = dateAnnulationAct;
  }

  public String getEtatActivite() {
    return etatActivite;
  }

  public void setEtatActivite(String etatActivite) {
    this.etatActivite = etatActivite;
  }

  public String getId_encadrant() {
    return id_encadrant;
  }

  public void setId_encadrant(String id_encadrant) {
    this.id_encadrant = id_encadrant;
  }
}

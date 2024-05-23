package com.gactiapi.com.dto;

import com.gactiapi.com.model.Animation;
import com.gactiapi.com.model.Compte;

import java.util.Date;

public class UpdateActiviteDto {
  private Integer idActivite;
  private Animation animation;
  private Date dateAct;
  private Date dateAnnulationAct;
  private String etatActivite;
  private Compte encadrant;

  public UpdateActiviteDto(Integer idActivite, Animation animation, Date dateAct, Date dateAnnulationAct, String etatActivite, Compte encadrant) {
    this.idActivite = idActivite;
    this.animation = animation;
    this.dateAct = dateAct;
    this.dateAnnulationAct = dateAnnulationAct;
    this.etatActivite = etatActivite;
    this.encadrant = encadrant;
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

  public Compte getEncadrant() {
    return encadrant;
  }

  public void setEncadrant(Compte encadrant) {
    this.encadrant = encadrant;
  }
}

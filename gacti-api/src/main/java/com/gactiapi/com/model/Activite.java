package com.gactiapi.com.model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class Activite {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer idActivite;
  @ManyToOne
  @JoinColumn(name = "idAnimation")
  private Animation animation;
  private Integer prixAct;
  private Date dateAct;
  private Date dateAnnulationAct;
  private String etatActivite;
  @ManyToOne
  @JoinColumn(name = "encadrant_id")
  private Compte encadrant;


  public Activite() {
    this.etatActivite = "PREVUE";
  }

  public Activite(Animation animation, Integer prixAct, Date dateAct, Compte encadrant) {
    this.animation = animation;
    this.prixAct = prixAct;
    this.dateAct = dateAct;
    this.etatActivite = "Prévue";
    this.dateAnnulationAct = null;
    this.encadrant = encadrant;
  }


  public Activite(Integer idActivite, Animation animation,Integer prixAct ,Date dateAct, Date dateAnnulationAct, String etatActivite, Compte encadrant) {
    this.idActivite = idActivite;
    this.animation = animation;
    this.prixAct = prixAct;
    this.dateAct = dateAct;
    this.dateAnnulationAct = dateAnnulationAct;
    this.etatActivite = etatActivite;
    this.encadrant = encadrant;
  }

  public int getIdActivite() {
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

  public Compte getEncadrant() {
    return encadrant;
  }

  public void setEncadrant(Compte encadrant) {
    this.encadrant = encadrant;
  }

}

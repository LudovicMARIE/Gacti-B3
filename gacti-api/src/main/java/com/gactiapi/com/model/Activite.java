package com.gactiapi.com.model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class Activite {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer idActivite;
  @OneToOne
  private Animation animation;
  private Date dateAct;
  private Date dateAnnulationAct;
  private String etatActivite;
  @ManyToOne
  @JoinColumn(name = "idUser")
  private Compte encadrant;

  @ManyToMany
  private List<Compte> participants;

  public int getIdActivite() {
    return idActivite;
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
}

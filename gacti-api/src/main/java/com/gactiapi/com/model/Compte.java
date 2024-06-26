package com.gactiapi.com.model;

import jakarta.persistence.*;
import jakarta.validation.Constraint;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
public class Compte implements UserDetails {
  @Id
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

  @ManyToMany
  @JoinTable(
    name = "compte_activite",
    joinColumns = @jakarta.persistence.JoinColumn(name = "idUser"),
    inverseJoinColumns = @jakarta.persistence.JoinColumn(name = "idActivite")
  )
  private List<Activite> activites;

  public Compte(){
    this.dateInscrip = new Date();
  }

  public Compte(String idUser, String mdp, String nomCompte, String prenomCompte, Date dateDebSejour, Date dateFinSejour, String adrMailCompte, String telCompte, List<Activite> activites) {
    this.idUser = idUser;
    this.mdp = mdp;
    this.nomCompte = nomCompte;
    this.prenomCompte = prenomCompte;
    this.dateInscrip = new Date();
    this.typeProfil = "client";
    this.dateDebSejour = dateDebSejour;
    this.dateFinSejour = dateFinSejour;
    this.adrMailCompte = adrMailCompte;
    this.telCompte = telCompte;
    this.activites = activites;
  }

  public Compte(String idUser, String mdp, String nomCompte, String prenomCompte, String typeProfil, Date dateDebSejour, Date dateFinSejour, String adrMailCompte, String telCompte, List<Activite> activites) {
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
    this.activites = activites;
  }

  public String getIdUser() {
    return idUser;
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

  public List<Activite> getActivites() {
    return activites;
  }

  public void setActivites(List<Activite> activites) {
    this.activites = activites;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return null;
  }

  @Override
  public String getPassword() {
    return mdp;
  }

  @Override
  public String getUsername() {
    return adrMailCompte;
  }

  @Override
  public boolean isAccountNonExpired() {
    return false;
  }

  @Override
  public boolean isAccountNonLocked() {
    return false;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return false;
  }

  @Override
  public boolean isEnabled() {
    return false;
  }
}

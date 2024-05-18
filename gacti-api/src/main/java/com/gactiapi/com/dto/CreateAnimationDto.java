package com.gactiapi.com.dto;

import java.util.Date;

public class CreateAnimationDto {
  private String idAnimation;
  private String nomAnimation;
  private Date dateCreationAnimation;
  private Double dureeAnimation;
  private Integer limiteAge;
  private Integer nbPlaceAnimation;
  private String descriptionAnimation;
  private String typeAnimation;
  private String difficulteAnimation;

  public CreateAnimationDto() {
    this.dateCreationAnimation = new Date();
  }

  public CreateAnimationDto(String idAnimation, String nomAnimation, Double dureeAnimation, Integer limiteAge, Integer nbPlaceAnimation, String descriptionAnimation, String typeAnimation, String difficulteAnimation) {
    this.idAnimation = idAnimation;
    this.nomAnimation = nomAnimation;
    this.dateCreationAnimation = new Date();
    this.dureeAnimation = dureeAnimation;
    this.limiteAge = limiteAge;
    this.nbPlaceAnimation = nbPlaceAnimation;
    this.descriptionAnimation = descriptionAnimation;
    this.typeAnimation = typeAnimation;
    this.difficulteAnimation = difficulteAnimation;
  }

  public String getIdAnimation() {
    return idAnimation;
  }

  public String getNomAnimation() {
    return nomAnimation;
  }

  public void setNomAnimation(String nomAnimation) {
    this.nomAnimation = nomAnimation;
  }

  public Date getDateCreationAnimation() {
    return dateCreationAnimation;
  }

  public Double getDureeAnimation() {
    return dureeAnimation;
  }

  public void setDureeAnimation(Double dureeAnimation) {
    this.dureeAnimation = dureeAnimation;
  }

  public Integer getLimiteAge() {
    return limiteAge;
  }

  public void setLimiteAge(Integer limiteAge) {
    this.limiteAge = limiteAge;
  }

  public Integer getNbPlaceAnimation() {
    return nbPlaceAnimation;
  }

  public void setNbPlaceAnimation(Integer nbPlaceAnimation) {
    this.nbPlaceAnimation = nbPlaceAnimation;
  }

  public String getDescriptionAnimation() {
    return descriptionAnimation;
  }

  public void setDescriptionAnimation(String descriptionAnimation) {
    this.descriptionAnimation = descriptionAnimation;
  }

  public String getTypeAnimation() {
    return typeAnimation;
  }

  public void setTypeAnimation(String typeAnimation) {
    this.typeAnimation = typeAnimation;
  }

  public String getDifficulteAnimation() {
    return difficulteAnimation;
  }

  public void setDifficulteAnimation(String difficulteAnimation) {
    this.difficulteAnimation = difficulteAnimation;
  }
}

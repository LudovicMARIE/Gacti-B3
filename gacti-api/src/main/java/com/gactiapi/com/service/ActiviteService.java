package com.gactiapi.com.service;

import com.gactiapi.com.dto.CreateActiviteDto;
import com.gactiapi.com.dto.UpdateActiviteDto;
import com.gactiapi.com.model.Activite;
import com.gactiapi.com.model.Compte;
import com.gactiapi.com.repository.ActiviteRepository;
import com.gactiapi.com.repository.AnimationRepository;
import com.gactiapi.com.repository.CompteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActiviteService {

  @Autowired
  private ActiviteRepository activiteRepository;

  @Autowired
  private AnimationRepository animationRepository;

  @Autowired
  private CompteRepository compteRepository;

  public ResponseEntity<List<Activite>> findAllActivites() {
    return new ResponseEntity<>(activiteRepository.findAllByDateActIsNotNullOrderByDateAct(), HttpStatus.OK);
  }

  public ResponseEntity<Activite> findActiviteById(int idActivite){
    Activite activiteFound = activiteRepository.findByidActivite(idActivite).orElseThrow(() -> new RuntimeException("Activity does not exist."));
    return new ResponseEntity<>(activiteFound,HttpStatus.OK);
  }

  public ResponseEntity<Activite> createActivite(CreateActiviteDto createActiviteDto){
    Compte encadrant =  compteRepository.findByidUser(createActiviteDto.getId_encadrant()).orElseThrow(() -> new RuntimeException("Encadrant not found."));
    Activite newActivite = new Activite(
      createActiviteDto.getAnimation(),
      createActiviteDto.getPrixAct(),
      createActiviteDto.getDateAct(),
      encadrant
    );
    activiteRepository.save(newActivite);
    return new ResponseEntity<>(newActivite, HttpStatus.CREATED);
  }

  public ResponseEntity<Activite> updateActivite(int idActivite,UpdateActiviteDto updateActiviteDto){
    Activite existingActivite = activiteRepository.findByidActivite(idActivite)
      .orElseThrow(() -> new RuntimeException("Activity does not exist."));
    existingActivite.setIdActivite(updateActiviteDto.getIdActivite());
    existingActivite.setAnimation(updateActiviteDto.getAnimation());
    existingActivite.setPrixAct(updateActiviteDto.getPrixAct());
    existingActivite.setDateAct(updateActiviteDto.getDateAct());
    existingActivite.setEtatActivite(updateActiviteDto.getEtatActivite());
    existingActivite.setDateAnnulationAct(updateActiviteDto.getDateAnnulationAct());
    existingActivite.setEncadrant(updateActiviteDto.getEncadrant());
    Activite updatedActivite = activiteRepository.save(existingActivite);
    return new ResponseEntity<>(updatedActivite, HttpStatus.OK);
  }

  public ResponseEntity<HttpStatus> deleteActivite(int idActivite){
    this.clearRegistrationsForActivity(idActivite);

    activiteRepository.deleteById(idActivite);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  public void clearRegistrationsForActivity(int idActivite) {
    Activite activite = activiteRepository.findByidActivite(idActivite)
      .orElseThrow(() -> new RuntimeException("Activity does not exist."));

    List<Compte> comptes = compteRepository.findAll();
    for (Compte compte : comptes) {
      if (compte.getActivites().remove(activite)) {
        compteRepository.save(compte);
      }
    }
  }



  public ResponseEntity<List<Activite>> findAllByType(String typeAnim){
    List<Activite> actList = activiteRepository.findAllByAnimationType(typeAnim);
    return new ResponseEntity<>(actList, HttpStatus.OK);
  }

}

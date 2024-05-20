package com.gactiapi.com.service;

import com.gactiapi.com.dto.CreateActiviteDto;
import com.gactiapi.com.dto.UpdateActiviteDto;
import com.gactiapi.com.model.Activite;
import com.gactiapi.com.repository.ActiviteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActiviteService {

  @Autowired
  private ActiviteRepository activiteRepository;

  public ResponseEntity<List<Activite>> findAllActivites() {
    return new ResponseEntity<>(activiteRepository.findAll(), HttpStatus.OK);
  }

  public ResponseEntity<Activite> createActivite(CreateActiviteDto createActiviteDto){
    Activite newActivite = new Activite(
      createActiviteDto.getAnimation(),
      createActiviteDto.getDateAct(),
      createActiviteDto.getEncadrant()
    );
    activiteRepository.save(newActivite);
    return new ResponseEntity<>(newActivite, HttpStatus.CREATED);
  }

  public ResponseEntity<Activite> updateActivite(int idActivite,UpdateActiviteDto updateActiviteDto){
    Activite existingActivite = activiteRepository.findByidActivite(idActivite)
      .orElseThrow(() -> new RuntimeException("Activity does not exist."));

    existingActivite.setAnimation(updateActiviteDto.getAnimation());
    existingActivite.setDateAct(updateActiviteDto.getDateAct());
    existingActivite.setEtatActivite(updateActiviteDto.getEtatActivite());
    existingActivite.setDateAnnulationAct(updateActiviteDto.getDateAnnulationAct());
    existingActivite.setEncadrant(updateActiviteDto.getEncadrant());
    Activite updatedActivite = activiteRepository.save(existingActivite);
    return new ResponseEntity<>(updatedActivite, HttpStatus.OK);
  }

}

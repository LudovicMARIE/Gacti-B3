package com.gactiapi.com.service;

import com.gactiapi.com.dto.CreateActiviteDto;
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
    );
    return new ResponseEntity<>(newActivite, HttpStatus.CREATED);
  }
}

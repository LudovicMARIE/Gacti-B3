package com.gactiapi.com.controller;

import com.gactiapi.com.dto.CreateActiviteDto;
import com.gactiapi.com.model.Activite;
import com.gactiapi.com.service.ActiviteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/activites")
public class ActiviteController {

  @Autowired
  private ActiviteService activiteService;

  @GetMapping
  public ResponseEntity<List<Activite>> findAllActivites(){
    try {
      return activiteService.findAllActivites();
    } catch (RuntimeException e){
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping
  public ResponseEntity<Activite> createActivite(@RequestBody CreateActiviteDto createActiviteDto){
    try{
      return activiteService.createActivite(createActiviteDto);
    }catch(RuntimeException e){
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}

package com.gactiapi.com.controller;

import com.gactiapi.com.dto.CreateActiviteDto;
import com.gactiapi.com.dto.UpdateActiviteDto;
import com.gactiapi.com.model.Activite;
import com.gactiapi.com.service.ActiviteService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
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

  @GetMapping("/{idActivite}")
  public ResponseEntity<Activite> findActiviteById(@PathVariable int idActivite){
    try {
      return activiteService.findActiviteById(idActivite);
    }catch(RuntimeException e){
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/type/{typeAnimation}")
  public ResponseEntity<List<Activite>> findAllByAnimType(@PathVariable String typeAnimation){
    return activiteService.findAllByType(typeAnimation);
  }

  @PostMapping
  public ResponseEntity<Activite> createActivite(@RequestBody CreateActiviteDto createActiviteDto){
    //try{
      return activiteService.createActivite(createActiviteDto);
    //}catch(RuntimeException e){
    //  return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //}
  }


  @PutMapping("/{idActivite}")
  public ResponseEntity<Activite> updateActivite(@PathVariable int idActivite, @RequestBody UpdateActiviteDto updateActiviteDto){
    return activiteService.updateActivite(idActivite, updateActiviteDto);
  }

  @DeleteMapping("/{idActivite}")
  public ResponseEntity<HttpStatus> deleteActivite(@PathVariable int idActivite){
    return activiteService.deleteActivite(idActivite);
  }

}

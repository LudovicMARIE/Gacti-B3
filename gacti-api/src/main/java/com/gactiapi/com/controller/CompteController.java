package com.gactiapi.com.controller;

import com.gactiapi.com.dto.CreateCompteDto;
import com.gactiapi.com.dto.LoginDto;
import com.gactiapi.com.dto.ReturnCompteDto;
import com.gactiapi.com.dto.UpdateCompteDto;
import com.gactiapi.com.model.Activite;
import com.gactiapi.com.model.Compte;
import com.gactiapi.com.service.CompteService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.catalina.User;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class CompteController {
  @Autowired
  private CompteService compteService;

  private SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();

  @GetMapping("")
  public ResponseEntity<List<Compte>> findAllComptes() {
    try {
      return compteService.findAllComptes();
    } catch (RuntimeException e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/{idUser}")
  public ResponseEntity<Compte> findCompteById(@PathVariable String idUser){
    try{
      return compteService.findCompteById(idUser);
    }catch(RuntimeException e){
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/login")
  public ResponseEntity<ReturnCompteDto> login(@RequestBody LoginDto loginDto, HttpServletRequest request, HttpServletResponse response) {
    try {
      Thread.sleep(1000);
      ReturnCompteDto user = compteService.login(loginDto).getBody();

      SecurityContext context = SecurityContextHolder.getContext();
      context.setAuthentication(new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList()));
      securityContextRepository.saveContext(context, request, response);

      return new ResponseEntity<>(user, HttpStatus.OK);
    } catch (RuntimeException e) {
      if (e.getMessage().equals("Password mismatch.")) {
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
      }
      if (e.getMessage().equals("User does not exist.")) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    } catch (InterruptedException e) {
        throw new RuntimeException(e);
    }
  }

  @PostMapping("/register")
  public ResponseEntity<Compte> createAccount(@RequestBody CreateCompteDto createCompteDto) {
    return compteService.createCompte(createCompteDto);
  }

  @PutMapping("/{idUser}")
  public ResponseEntity<Compte> updateAccount(@PathVariable String idUser, @RequestBody UpdateCompteDto updateCompteDto){
    return compteService.updateCompte(idUser, updateCompteDto);
  }

  @GetMapping("/{idUser}/activities")
  public ResponseEntity<List<Activite>> getActivityList(@PathVariable String idUser){
    return compteService.getActivitiesRegistered(idUser);
  }

  @PostMapping("/{idUser}/activities/{idActivite}")
  public ResponseEntity<HttpStatus> registerActivity(@PathVariable String idUser, @PathVariable int idActivite){
    return compteService.registerActivity(idUser, idActivite);
  }

  @PostMapping("/{idUser}/activities/delete/{idActivite}")
  public ResponseEntity<HttpStatus> unregisterActivity(@PathVariable String idUser, @PathVariable int idActivite){
    return compteService.unregisterActivity(idUser, idActivite);
  }

  @GetMapping("/type/{typeProfil}")
  public ResponseEntity<List<Compte>> getUsersByTypeProfil(@PathVariable String typeProfil){
    return compteService.getAllCompteByType(typeProfil);
  }

  @DeleteMapping("/{idUser}")
  public ResponseEntity<HttpStatus> deleteUser(@PathVariable Long idUser){
    return compteService.deleteCompte(idUser);
  }

  @GetMapping("/activity/{idActivite}")
  public ResponseEntity<List<Compte>> findAllByAct(@PathVariable int idActivite){
    return compteService.findAllWithAct(idActivite);
  }

  @DeleteMapping("/{idUser}/activities")
  public ResponseEntity<Compte> purgeRegistrationsUser(@PathVariable String idUser){
    return compteService.purgeActivitiesUser(idUser);
  }

}

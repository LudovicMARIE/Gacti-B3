package com.gactiapi.com.controller;

import com.gactiapi.com.dto.CreateCompteDto;
import com.gactiapi.com.dto.LoginDto;
import com.gactiapi.com.model.Compte;
import com.gactiapi.com.service.CompteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class CompteController {
  @Autowired
  private CompteService compteService;

  @GetMapping("")
  public ResponseEntity<List<Compte>> findAllComptes() {
    try {
      return compteService.findAllComptes();
    } catch (RuntimeException e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/login")
  public ResponseEntity<Compte> login(@RequestBody LoginDto loginDto) {
    try {
      return compteService.login(loginDto);
    } catch (RuntimeException e) {
      System.out.println(e.getMessage());

      if (e.getMessage().equals("Password mismatch.")) {
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
      }
      if (e.getMessage().equals("User does not exist.")) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/register")
  public ResponseEntity<Compte> createAccount(@RequestBody CreateCompteDto createCompteDto) {
    return compteService.createCompte(createCompteDto);
  }
}

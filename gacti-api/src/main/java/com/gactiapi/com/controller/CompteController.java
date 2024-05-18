package com.gactiapi.com.controller;

import com.gactiapi.com.dto.CreateCompteDto;
import com.gactiapi.com.dto.LoginDto;
import com.gactiapi.com.model.Compte;
import com.gactiapi.com.service.CompteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class CompteController {
  @Autowired
  private CompteService compteService;

  @PostMapping("/login")
  public ResponseEntity<Compte> login(@RequestBody LoginDto loginDto) {
    return compteService.login(loginDto);
  }

  @PostMapping("/register")
  public ResponseEntity<Compte> createAccount(@RequestBody CreateCompteDto createCompteDto) {
    return compteService.createCompte(createCompteDto);
  }
}

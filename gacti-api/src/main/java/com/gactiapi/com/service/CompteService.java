package com.gactiapi.com.service;

import com.gactiapi.com.dto.CreateCompteDto;
import com.gactiapi.com.dto.LoginDto;
import com.gactiapi.com.model.Compte;
import com.gactiapi.com.repository.CompteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
public class CompteService {
  @Autowired
  private CompteRepository compteRepository;

  public ResponseEntity<List<Compte>> findAllComptes() {
    return new ResponseEntity<>(compteRepository.findAll(), HttpStatus.OK);
  }

  public ResponseEntity<Compte> login(LoginDto loginDto) {
    Compte user = compteRepository.findByidUser(loginDto.getIdUser()).orElse(null);
    if(user == null) {
      throw new RuntimeException("User does not exist.");
    }
    String hashedPassword = hashPassword(loginDto.getMdp());
    if(!user.getMdp().equals(hashedPassword)){
      throw new RuntimeException("Password mismatch.");
    }
    return new ResponseEntity<>(user, HttpStatus.OK);

  }

  public ResponseEntity<Compte> createCompte(CreateCompteDto createCompteDto){
    if(compteRepository.findByidUser(createCompteDto.getIdUser()).isPresent()){
      throw new RuntimeException("User already exists.");
    }
    String hashedMdp = hashPassword(createCompteDto.getMdp());
    Compte newCompte = new Compte(
      createCompteDto.getIdUser(),
      hashedMdp,
      createCompteDto.getNomCompte(),
      createCompteDto.getPrenomCompte(),
      createCompteDto.getDateDebSejour(),
      createCompteDto.getDateFinSejour(),
      createCompteDto.getAdrMailCompte(),
      createCompteDto.getTelCompte()
    );
    compteRepository.save(newCompte);
    return new ResponseEntity<>(newCompte, HttpStatus.CREATED);
  }



  private String hashPassword(String password) {
    try {
      MessageDigest md = MessageDigest.getInstance("SHA-256");
      byte[] hash = md.digest(password.getBytes(StandardCharsets.UTF_8));
      BigInteger number = new BigInteger(1, hash);
      StringBuilder hexString = new StringBuilder(number.toString(16));
      while (hexString.length() < 32) {
        hexString.insert(0, '0');
      }
      return hexString.toString();
    } catch (NoSuchAlgorithmException e) {
      throw new RuntimeException(e);
    }
  }


}



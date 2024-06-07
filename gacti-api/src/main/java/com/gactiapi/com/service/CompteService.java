package com.gactiapi.com.service;

import com.gactiapi.com.dto.CreateCompteDto;
import com.gactiapi.com.dto.LoginDto;
import com.gactiapi.com.dto.UpdateCompteDto;
import com.gactiapi.com.model.Activite;
import com.gactiapi.com.model.Compte;
import com.gactiapi.com.repository.ActiviteRepository;
import com.gactiapi.com.repository.CompteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
public class CompteService implements UserDetailsService {
  @Autowired
  private CompteRepository compteRepository;

  @Autowired
  private ActiviteRepository activiteRepository;

  public ResponseEntity<List<Compte>> findAllComptes() {
    return new ResponseEntity<>(compteRepository.findAll(), HttpStatus.OK);
  }

  public ResponseEntity<Compte> login(LoginDto loginDto) {
    Compte user = compteRepository.findByadrMailCompte(loginDto.getMail()).orElse(null);
    if(user == null) {
      throw new RuntimeException("User does not exist.");
    }
    String hashedPassword = hashPassword(loginDto.getMdp());
    if(!user.getPassword().equals(hashedPassword)){
      throw new RuntimeException("Password mismatch.");
    }
    return new ResponseEntity<>(user, HttpStatus.OK);

  }

  public ResponseEntity<Compte> findCompteById(String idCompte){
    Compte user = compteRepository.findByidUser(idCompte).orElseThrow(() -> new RuntimeException());
    return new ResponseEntity<>(user, HttpStatus.OK);
  }

  public ResponseEntity<Compte> createCompte(CreateCompteDto createCompteDto){
    if(compteRepository.findByidUser(createCompteDto.getIdUser()).isPresent()){
      throw new RuntimeException("User already exists.");
    }
    if(compteRepository.findByadrMailCompte(createCompteDto.getAdrMailCompte()).isPresent()){
      throw new RuntimeException("Email already used.");
    }
    String hashedMdp = hashPassword(createCompteDto.getMdp());
      Compte newCompte;
      if(createCompteDto.getTypeProfil() != null){
          newCompte = new Compte(
                  createCompteDto.getIdUser(),
                  hashedMdp,
                  createCompteDto.getNomCompte(),
                  createCompteDto.getPrenomCompte(),
                  createCompteDto.getTypeProfil(),
                  createCompteDto.getDateDebSejour(),
                  createCompteDto.getDateFinSejour(),
                  createCompteDto.getAdrMailCompte(),
                  createCompteDto.getTelCompte(),
                  createCompteDto.getActiviteList()
          );
      }else{
          newCompte = new Compte(
                  createCompteDto.getIdUser(),
                  hashedMdp,
                  createCompteDto.getNomCompte(),
                  createCompteDto.getPrenomCompte(),
                  createCompteDto.getDateDebSejour(),
                  createCompteDto.getDateFinSejour(),
                  createCompteDto.getAdrMailCompte(),
                  createCompteDto.getTelCompte(),
                  createCompteDto.getActiviteList()
          );
      }
      compteRepository.save(newCompte);
      return new ResponseEntity<>(newCompte, HttpStatus.CREATED);

  }


  public ResponseEntity<Compte> updateCompte(String idUser,UpdateCompteDto updateCompteDto){
    Compte existingCompte = compteRepository.findByidUser(idUser)
      .orElseThrow(() -> new RuntimeException("User does not exist."));

    existingCompte.setNomCompte(updateCompteDto.getNomCompte());
    existingCompte.setPrenomCompte(updateCompteDto.getPrenomCompte());
    existingCompte.setDateFerme(updateCompteDto.getDateFerme());
    existingCompte.setDateFerme(updateCompteDto.getDateFerme());
    existingCompte.setTypeProfil(updateCompteDto.getTypeProfil());
    existingCompte.setDateDebSejour(updateCompteDto.getDateDebSejour());
    existingCompte.setDateFinSejour(updateCompteDto.getDateFinSejour());
    existingCompte.setAdrMailCompte(updateCompteDto.getAdrMailCompte());
    existingCompte.setTelCompte(updateCompteDto.getTelCompte());
    existingCompte.setActivites(updateCompteDto.getActivites());
    Compte updatedCompte = compteRepository.save(existingCompte);
    return new ResponseEntity<>(updatedCompte, HttpStatus.OK);
  }

  public ResponseEntity<List<Activite>> getActivitiesRegistered(String idUser){
    Compte compte = compteRepository.findByidUser(idUser)
      .orElseThrow(() -> new RuntimeException("User does not exist."));
    List<Activite> activityList = compte.getActivites();

    return new ResponseEntity<>(activityList, HttpStatus.OK);

  }

  public ResponseEntity<List<Compte>> getAllCompteByType(String typeprofil){
    List<Compte> Comptes = compteRepository.findAllByTypeProfil(typeprofil);
    return new ResponseEntity<>(Comptes, HttpStatus.OK);
  }

  public ResponseEntity<HttpStatus> registerActivity(String idUser, int idActivite){
    Compte userFound = compteRepository.findByidUser(idUser).orElseThrow(() -> new RuntimeException("User not found."));
    Activite activiteFound = activiteRepository.findByidActivite(idActivite).orElseThrow(() -> new RuntimeException("Activity not found"));
    List<Activite> activityList = userFound.getActivites();
    activityList.add(activiteFound);
    userFound.setActivites(activityList);
    compteRepository.save(userFound);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  public ResponseEntity<HttpStatus> unregisterActivity(String idUser, int idActivite){
    Compte userFound = compteRepository.findByidUser(idUser).orElseThrow(() -> new RuntimeException("User not found."));
    Activite activiteFound = activiteRepository.findByidActivite(idActivite).orElseThrow(() -> new RuntimeException("Activity not found"));
    List<Activite> activityList = userFound.getActivites();
    activityList.remove(activiteFound);
    userFound.setActivites(activityList);
    compteRepository.save(userFound);
    return new ResponseEntity<>(HttpStatus.OK);
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

  public ResponseEntity<HttpStatus> deleteCompte(Long idCompte){
    compteRepository.deleteById(idCompte);
    return new ResponseEntity<>(HttpStatus.OK);
  }


  @Override
  public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
    return compteRepository.findByadrMailCompte(mail).orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable"));
  }
}



package com.gactiapi.com.repository;

import com.gactiapi.com.model.Activite;
import com.gactiapi.com.model.Compte;
import jakarta.persistence.Entity;
import jakarta.persistence.NamedQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompteRepository extends JpaRepository<Compte, Long> {
  Optional<Compte> findByidUser(String idUser);

  public List<Compte> findAllByTypeProfil(String typeProfil);

  Optional<Compte> findByadrMailCompte(String email);


  List<Compte> findAllByActivites(Activite activity);

}

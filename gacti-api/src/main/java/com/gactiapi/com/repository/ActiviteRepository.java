package com.gactiapi.com.repository;

import com.gactiapi.com.model.Activite;
import com.gactiapi.com.model.Animation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ActiviteRepository extends JpaRepository<Activite, Integer> {
  Optional<Animation> findByidActivite(int idActivite);
}

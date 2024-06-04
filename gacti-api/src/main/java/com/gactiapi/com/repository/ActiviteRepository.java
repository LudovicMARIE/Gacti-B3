package com.gactiapi.com.repository;

import com.gactiapi.com.dto.CreateActiviteDto;
import com.gactiapi.com.model.Activite;
import com.gactiapi.com.model.Animation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ActiviteRepository extends JpaRepository<Activite, Integer> {
  Optional<Activite> findByidActivite(int idActivite);

  @Query("SELECT a FROM Activite a JOIN a.animation anim WHERE anim.typeAnimation = ?1")
  List<Activite> findAllByAnimationType(String typeAnim);


}

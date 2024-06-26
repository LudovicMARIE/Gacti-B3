package com.gactiapi.com.repository;

import com.gactiapi.com.model.Activite;
import com.gactiapi.com.model.Animation;
import com.gactiapi.com.model.Compte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnimationRepository extends JpaRepository<Animation, String>{
  Optional<Animation> findByidAnimation(String idAnimation);
}

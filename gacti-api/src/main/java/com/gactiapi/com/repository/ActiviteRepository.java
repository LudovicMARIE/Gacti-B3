package com.gactiapi.com.repository;

import com.gactiapi.com.model.Activite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActiviteRepository extends JpaRepository<Activite, Integer> {

}

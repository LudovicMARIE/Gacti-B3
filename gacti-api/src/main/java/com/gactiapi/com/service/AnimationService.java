package com.gactiapi.com.service;

import com.gactiapi.com.dto.CreateAnimationDto;
import com.gactiapi.com.model.Animation;
import com.gactiapi.com.repository.AnimationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimationService {
  @Autowired
  private AnimationRepository animationRepository;

  public ResponseEntity<List<Animation>> findAllAnimations(){
    return new ResponseEntity<>(animationRepository.findAll(), HttpStatus.OK);
  }

  public ResponseEntity<Animation> createAnimation(CreateAnimationDto createAnimationDto){
    if(animationRepository.findByidAnimation(createAnimationDto.getIdAnimation()).isPresent()){
      throw new RuntimeException("Animation already exists.");
    }
    Animation newAnimation = new Animation(
      createAnimationDto.getIdAnimation(),
      createAnimationDto.getNomAnimation(),
      createAnimationDto.getDureeAnimation(),
      createAnimationDto.getLimiteAge(),
      createAnimationDto.getNbPlaceAnimation(),
      createAnimationDto.getDescriptionAnimation(),
      createAnimationDto.getTypeAnimation(),
      createAnimationDto.getDifficulteAnimation()
    );
    animationRepository.save(newAnimation);
  return new ResponseEntity<>(newAnimation, HttpStatus.CREATED);
  }


}

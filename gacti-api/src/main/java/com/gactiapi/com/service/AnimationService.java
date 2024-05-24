package com.gactiapi.com.service;

import com.gactiapi.com.dto.CreateAnimationDto;
import com.gactiapi.com.dto.UpdateAnimationDto;
import com.gactiapi.com.model.Animation;
import com.gactiapi.com.repository.AnimationRepository;
import org.apache.coyote.Response;
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

  public ResponseEntity<Animation> findAnimationById(String idAnimation){
    Animation animation = animationRepository.findByidAnimation(idAnimation).orElseThrow(() -> new RuntimeException());
    return new ResponseEntity<>(animation, HttpStatus.OK);
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

  public ResponseEntity<Animation> updateAnimation(String idAnimation, UpdateAnimationDto updateAnimationDto){
    Animation currentAnimation = animationRepository.findByidAnimation(idAnimation)
      .orElseThrow(() -> new RuntimeException("Animation does not exist."));

    currentAnimation.setIdAnimation(updateAnimationDto.getIdAnimation());
    currentAnimation.setNomAnimation(updateAnimationDto.getNomAnimation());
    currentAnimation.setDateCreationAnimation(updateAnimationDto.getDateCreationAnimation());
    currentAnimation.setDureeAnimation(updateAnimationDto.getDureeAnimation());
    currentAnimation.setLimiteAge(updateAnimationDto.getLimiteAge());
    currentAnimation.setNbPlaceAnimation(updateAnimationDto.getNbPlaceAnimation());
    currentAnimation.setDescriptionAnimation(updateAnimationDto.getDescriptionAnimation());
    currentAnimation.setTypeAnimation(updateAnimationDto.getTypeAnimation());
    currentAnimation.setDifficulteAnimation(updateAnimationDto.getDifficulteAnimation());

    Animation animation = animationRepository.save(currentAnimation);
    return new ResponseEntity<>(animation, HttpStatus.OK);
  }

  public ResponseEntity<HttpStatus> deleteAnimation(String idAnimation){
    animationRepository.deleteById(idAnimation);
    return new ResponseEntity<>(HttpStatus.OK);
  }


}

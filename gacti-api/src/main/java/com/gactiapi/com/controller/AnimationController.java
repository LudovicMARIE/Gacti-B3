package com.gactiapi.com.controller;

import com.gactiapi.com.dto.CreateAnimationDto;
import com.gactiapi.com.dto.UpdateAnimationDto;
import com.gactiapi.com.model.Animation;
import com.gactiapi.com.service.AnimationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/animations")
public class AnimationController {
  @Autowired
  private AnimationService animationService;

  @GetMapping
  public ResponseEntity<List<Animation>> findAllAnimations(){
    try {
      return animationService.findAllAnimations();
    }catch (RuntimeException e){
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/{idAnimation}")
  public ResponseEntity<Animation> findAnimationById(@PathVariable String animation){
    try{
      return animationService.findAnimationById(animation);
    }catch(RuntimeException e){
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping
  public ResponseEntity<Animation> createAnimation(@RequestBody CreateAnimationDto createAnimationDto){
    try{
      return animationService.createAnimation(createAnimationDto);
    }catch (RuntimeException e){
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("/{idAnimation}")
  public ResponseEntity<Animation> updateAnimation(@PathVariable String idAnimation, @RequestBody UpdateAnimationDto updateAnimationDto){
      return animationService.updateAnimation(idAnimation,updateAnimationDto);
  }

  @DeleteMapping("/{idAnimation}")
  public ResponseEntity<HttpStatus> deleteAnimation(@PathVariable String idAnimation){
    animationService.deleteAnimation(idAnimation);
    return new ResponseEntity<>(HttpStatus.OK);
  }


}

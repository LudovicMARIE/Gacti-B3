import { Component, OnInit } from '@angular/core';
import { AnimationType } from '../_enums/AnimationType.enum';
import { FormControl, FormGroup } from '@angular/forms';
import { Animation } from '../_interfaces/activity';
import { AnimationService } from '../_services/animation.service';

@Component({
  selector: 'app-createAnimation',
  templateUrl: './createAnimation.component.html',
  styleUrls: ['./createAnimation.component.scss']
})
export class CreateAnimationComponent implements OnInit {

  form!: FormGroup;

  animationTypeList: AnimationType[] = [
    AnimationType.SPORT,
    AnimationType.CULTURE,
    AnimationType.ART,
    AnimationType.NATURE,
    AnimationType.LOISIR,
    AnimationType.FAMILLE,
  ];

  constructor(private animationService: AnimationService) { 
    this.form = new FormGroup({
      idAnimation: new FormControl(''),
      nomAnimation: new FormControl(''),
      dureeAnimation: new FormControl(''),
      limiteAge: new FormControl(''),
      nbPlaceAnimation: new FormControl(''),
      descriptionAnimation: new FormControl(''),
      animType: new FormControl(''),
      difficulteAnimation: new FormControl('')
    });



  }

  ngOnInit() {
  }

  onSubmit(){
    console.log("Submit");
    let animation: Animation = {
      idAnimation: this.form.get('idAnimation')?.value,
      nomAnimation: this.form.get('nomAnimation')?.value,
      dateCreationAnimation: new Date(),
      dureeAnimation: this.form.get('dureeAnimation')?.value,
      limiteAge: this.form.get('limiteAge')?.value,
      nbPlaceAnimation: this.form.get('nbPlaceAnimation')?.value,
      descriptionAnimation: this.form.get('descriptionAnimation')?.value,
      typeAnimation: this.form.get('animType')?.value,
      difficulteAnimation: this.form.get('difficulteAnimation')?.value,
    }
    this.animationService.createAnimation(animation).subscribe({
      next: (response) => {
        console.log(response);
      }
    });
  }

}

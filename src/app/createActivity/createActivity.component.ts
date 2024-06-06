import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Activity, ActivityInserted, Animation } from '../_interfaces/activity';
import { AnimationService } from '../_services/animation.service';
import { Subject, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EtatActivite } from '../_enums/EtatActivite.enum';
import { User } from '../_interfaces/user';
import { CompteService } from '../_services/compte.service';
import { ActivityService } from '../_services/activity.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-createActivity',
  templateUrl: './createActivity.component.html',
  styleUrls: ['./createActivity.component.scss']
})
export class CreateActivityComponent implements OnInit {

  destroyRef = inject(DestroyRef);
  form!: FormGroup;
  animationList: Animation[] = [];
  selectedAnimation: Animation = {} as Animation;
  encadrantList: User[] = [];
  selectedEncadrant: User = {} as User;
  constructor(private animationService: AnimationService,
    private compteService: CompteService,
    private activityService: ActivityService,
    public dialogRef: MatDialogRef<CreateActivityComponent>) { 
    this.animationService.getAllAnimation().pipe(takeUntilDestroyed()).subscribe({
      next: (response) => {
        this.animationList = [];
        response.forEach((animation: any) => {
          let anim: Animation = {
            idAnimation: animation.idAnimation,
            nomAnimation: animation.nomAnimation,
            dateCreationAnimation: animation.dateCreationAnimation,
            dureeAnimation: animation.dureeAnimation,
            limiteAge: animation.limiteAge,
            nbPlaceAnimation: animation.nbPlaceAnimation,
            descriptionAnimation: animation.descriptionAnimation,
            typeAnimation: animation.typeAnimation,
            difficulteAnimation: animation.difficulteAnimation
          }
          this.animationList.push(anim);
        })
        
      }
      
    });

    this.compteService.getComptesByType('encadrant').pipe(takeUntilDestroyed()).subscribe({
      next: (response) => {
        this.encadrantList = [];
        response.forEach((encadrant: any) => {
          let encad: User = {
            idUser: encadrant.idUser,
            mdp: encadrant.mdp,
            nomCompte: encadrant.nomCompte,
            prenomCompte: encadrant.prenomCompte,
            dateInscrip: encadrant.dateInscrip,
            dateFerme: encadrant.dateFerme,
            typeProfil: encadrant.typeProfil,
            dateDebSejour: encadrant.dateDebSejour,
            dateFinSejour: encadrant.dateFinSejour,
            adrMailCompte: encadrant.adrMailCompte,
            telCompte: encadrant.telCompte,
            activites: encadrant.activites,
          }
          this.encadrantList.push(encad);
        });
      }
    });
  }

  ngOnInit() {
    const destroyed = new Subject();
 
    this.destroyRef.onDestroy(() => {
      destroyed.next(null);
      destroyed.complete();
    });
 



    
    console.log(this.animationList);
    this.form = new FormGroup({
      anim: new FormControl('',Validators.required),
      prixAct: new FormControl('',Validators.required),
      dateAct: new FormControl('',Validators.required),
      encad: new FormControl('',Validators.required),
    });
    
  }

  onSubmit(){
    let activity: ActivityInserted = {
      idActivite: 0,
      animation: this.selectedAnimation,
      prixAct: this.form.get('prixAct')?.value,
      dateAct: new Date(this.form.get('dateAct')?.value),
      dateAnnulationAct: undefined,
      etatActivite: EtatActivite.PLANNED,
      id_encadrant: this.form.get('encad')?.value
    };
    this.activityService.createActivite(activity).subscribe({
      next: (response) => {
        console.log(response);
        this.dialogRef.close();
      }
    });
  }

  onChangeAnim(idAnim: string){

    console.log(idAnim);
    const foundAnimation = this.animationList.find(animation => animation.idAnimation === idAnim);
    if (foundAnimation) {
      console.log(foundAnimation)
      this.selectedAnimation = foundAnimation;
    } else {
      // Animation with the specified idAnim was not found
    }
  }
}


import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { SessionService } from '../_services/session.service';
import { User } from '../_interfaces/user';
import { Router } from '@angular/router';
import { ActivityService } from '../_services/activity.service';
import { Activity, Animation } from '../_interfaces/activity';
import { AnimationType } from '../_enums/AnimationType.enum';
import { MatDialog } from '@angular/material/dialog';
import { CreateActivityComponent } from '../createActivity/createActivity.component';
import { CreateAnimationComponent } from '../createAnimation/createAnimation.component';
import { Subject } from 'rxjs';
import { AnimationService } from '../_services/animation.service';
import { ViewActivityDetailsComponent } from '../view-activity-details/view-activity-details.component';
import { CompteService } from '../_services/compte.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EtatActivite } from '../_enums/EtatActivite.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  destroyRef = inject(DestroyRef);

User: User = {
  idUser: '',
  mdp: '',
  nomCompte: '',
  prenomCompte: '',
  dateInscrip: new Date(),
  dateFerme: new Date(),
  typeProfil: 'client',
  dateDebSejour: new Date(),
  dateFinSejour: new Date(),
  adrMailCompte: '',
  telCompte: '',
  activites: []
}

page: string = 'default';
activityList: Activity[] = [];
animationTypeList: AnimationType[] = [
  AnimationType.SPORT,
  AnimationType.CULTURE,
  AnimationType.ART,
  AnimationType.NATURE,
  AnimationType.LOISIR,
  AnimationType.FAMILLE,
];
activityRegisteredList: Activity[] = [];
animList: Animation[] = [];
userList: User[] = [];
constructor(private sessionService: SessionService,
  private router: Router,
  private activityService: ActivityService,
  private dialog: MatDialog,
  private animationService: AnimationService,
  private compteService: CompteService) {
    this.compteService.getComptesByType('client').pipe(takeUntilDestroyed()).subscribe({
      next: (response) => {
        this.userList = [];
        response.forEach((user: User) => {
          this.userList.push(user);
        });
        console.log(this.userList);
      }
    });
   }

  ngOnInit() {
    const destroyed = new Subject();
 
    this.destroyRef.onDestroy(() => {
      destroyed.next(null);
      destroyed.complete();
    });

    if(this.sessionService.getUser() == null){
      this.router.navigateByUrl('');
    }else{
      console.log(this.sessionService.getUser());
      this.User = this.sessionService.getUser();
    }

    this.sessionService.currentPage.subscribe(value => {
      this.page = value;
    });
    

    this.initActivityList();
    this.initRegistrations();
    this.initAnimList();


  }

  onFilterChangeActivities(value: string){
    if(value == 'all'){
      this.initActivityList();
    }else{
      this.activityService.getAllActivitesByType(value).subscribe({
        next: (response) => {
          //console.log(response);
          this.activityList = [];
          response.forEach((activity: any) => {
            let act: Activity = {
              idActivite: activity.idActivite,
              animation: activity.animation,
              prixAct: activity.prixAct,
              dateAct: activity.dateAct,
              dateAnnulationAct: activity.dateAnnulationAct,
              etatActivite: activity.etatActivite,
              encadrant: activity.encadrant
              }
            this.activityList.push(act);
          });
          //console.log(this.activityList);
        },
        });
    }
  };


  deleteActivity(activity: Activity){
    this.activityService.deleteActivite(activity.idActivite).subscribe({
      next: (response) => {
        console.log(response);
        this.initActivityList();
      }
    });
  }


  registerActivity(idActivite: number){
    this.activityService.registerActivity(this.User.idUser, idActivite).subscribe({
      next: (response) => {
        //console.log(response);
        this.initRegistrations();
      }
    });
    
  }

  unregisterActivity(idActivite: number){
    this.activityService.unregisterActivity(this.User.idUser, idActivite).subscribe({
      next: (response) => {
        //console.log(response);
        this.initRegistrations();
      }
    });
    
  }

  initRegistrations(){
    this.activityService.getActivitesregisteredByUser(this.User.idUser).subscribe({
      next: (response) => {
        //console.log(response);
        this.activityRegisteredList = [];
        response.forEach((activity: any) => {
          let act: Activity = {
            idActivite: activity.idActivite,
            animation: activity.animation,
            prixAct: activity.prixAct,
            dateAct: activity.dateAct,
            dateAnnulationAct: activity.dateAnnulationAct,
            etatActivite: activity.etatActivite,
            encadrant: activity.encadrant
            }
          this.activityRegisteredList.push(act);
        });
        //console.log(this.activityRegisteredList);
      },
      });

  }



  

  initActivityList(){
    this.activityService.getAllActivites().subscribe({
      next: (response) => {
        //console.log(response);
        this.activityList = [];
        response.forEach((activity: any) => {
          let act: Activity = {
            idActivite: activity.idActivite,
            animation: activity.animation,
            prixAct: activity.prixAct,
            dateAct: activity.dateAct,
            dateAnnulationAct: activity.dateAnnulationAct,
            etatActivite: activity.etatActivite,
            encadrant: activity.encadrant
            }
          this.activityList.push(act);
        });
        //console.log(this.activityList);
      },
      });
  }

  initAnimList(){
    console.log('initAnimList');
    this.animationService.getAllAnimation().subscribe({
      next: (response) =>{
        this.animList = [];
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
          this.animList.push(anim);
        
        })
      }
    });
  }

  deleteAnimation(idAnim: string){
    this.animationService.deleteAnimation(idAnim).subscribe({
      next: (response) => {
        console.log(response);
        this.initAnimList();
      }
    });
  }


  openCreateActComponent(): void {
    const dialogRef = this.dialog.open(CreateActivityComponent, {
      width: 'fit-content',
      panelClass: 'custom-dialog-container',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.initActivityList();
    });
  }

  openCreateAnimComponent(): void {
    const dialogRef = this.dialog.open(CreateAnimationComponent, {
      width: 'fit-content',
      panelClass: 'custom-dialog-container',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.initAnimList();
    });
  }

  openViewActDetailsComponent(activity: Activity): void {
    console.log("activity inserted " + activity)
    const dialogRef = this.dialog.open(ViewActivityDetailsComponent, {
      width: 'fit-content',
      panelClass: 'custom-dialog-container',
      data: activity
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.initAnimList();
      this.initActivityList();
    });
  }

  purgeActivity(idUser: string){
    this.compteService.purgeActivity(idUser).subscribe({

    });
  }

  cancelActivity(activity: Activity){
    activity.dateAnnulationAct = new Date();
    activity.etatActivite = EtatActivite.CANCELED;
    this.activityService.cancelActivity(activity).subscribe({
      next: (response) => {
        console.log(response);
        this.initActivityList();
      }
    });
  }



}

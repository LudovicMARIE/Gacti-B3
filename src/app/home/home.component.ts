import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';
import { User } from '../_interfaces/user';
import { Router } from '@angular/router';
import { ActivityService } from '../_services/activity.service';
import { Activity } from '../_interfaces/activity';
import { AnimationType } from '../_enums/AnimationType.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
User: User = this.sessionService.getUser();
page: string = '';
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
constructor(private sessionService: SessionService,
  private router: Router,
  private activityService: ActivityService) { }

  ngOnInit() {
    if(this.sessionService.getUser() == null){
      this.router.navigateByUrl('');
    }else{
      console.log(this.sessionService.getUser());
      this.User = this.sessionService.getUser();
    }
    
    this.page = 'default';

    this.initActivityList();
    this.initRegistrations();


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

    // if(value == 'all'){
    //   this.activityService.getActivities().subscribe({
    //     next: (response) => {
    //       //console.log(response);
    //       this.activityList = [];
    //       response.forEach((activity: any) => {
    //         let act: Activity = {
    //           idActivite: activity.idActivite,
    //           animation: activity.animation,
    //           prixAct: activity.prixAct,
    //           dateAct: activity.dateAct.dateAct,
    //           dateAnnulationAct: activity.dateAnnulationAct,
    //           etatActivite: activity.etatActivite,
    //           encadrant: activity.encadrant
    //           }
    //         this.activityList.push(act);
    //       });
    //       //console.log(this.activityList);
    //     },
    //     });
    // }else{
    //   this.activityService.getActivityByAnimType(value).subscribe({
    //     next: (response) => {
    //       //console.log(response);
    //       this.activityList = [];
    //       response.forEach((activity: any) => {
    //         let act: Activity = {
    //           idActivite: activity.idActivite,
    //           animation: activity.animation,
    //           prixAct: activity.prixAct,
    //           dateAct: activity.dateAct.dateAct,
    //           dateAnnulationAct: activity.dateAnnulationAct,
    //           etatActivite: activity.etatActivite,
    //           encadrant: activity.encadrant
    //           }
    //         this.activityList.push(act);
    //       });
    //       //console.log(this.activityList);
    //     },
    //     });
    // }
  };


  deleteActivity(activity: Activity){
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

  deleteRegistration(registrationNumber: number){
    // this.activityService.deleteRegistration(registrationNumber).subscribe({
    //   next: (response) => {
    //     //console.log(response);
    //     this.initRegistrations();
    //   }
    // });
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



}

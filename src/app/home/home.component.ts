import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';
import { User } from '../_interfaces/user';
import { Router } from '@angular/router';
import { ActivityService } from '../_services/activity.service';
import { Activity, AnimationType } from '../_interfaces/activity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
User: User = this.sessionService.getUser();
page: string = '';
activityList: Activity[] = [];
animationTypeList: AnimationType[] = [];
  constructor(private sessionService: SessionService,
    private router: Router,
    private activityService: ActivityService) { }

  ngOnInit() {
    if(this.sessionService.getUser() == null){
      this.router.navigateByUrl('');
    }else{
      //console.log(this.sessionService.getUser());
      this.User = this.sessionService.getUser();
    }
    
    this.page = 'default';


    this.activityService.getActivities().subscribe({
    next: (response) => {
      //console.log(response);
      response.forEach((activity: any) => {
        let act: Activity = {
          codeAnim: activity.CODEANIM,
          dateAct: activity.DATEACT,
          codeEtatAct: activity.CODEETATACT,
          hrRdvAct: activity.HRRDVACT,
          prixAct: activity.PRIXACT,
          hrDebutAct: activity.HRDEBUTACT,
          hrFinAct: activity.HRFINACT,
          dateAnnuleAct: activity.DATEANNULEACT,
          nomResp: activity.NOMRESP,
          prenomResp: activity.PRENOMRESP,
          nomAnim: activity.NOMANIM
          }
        this.activityList.push(act);
      });
      //console.log(this.activityList);
    },
    });

    this.activityService.getActivityType().subscribe({
      next: (response) => {
        //console.log(response);
        response.forEach((activity: any) => {
          let actType: AnimationType = {
            codeTypeAnim: activity.CODETYPEANIM,
            nomTypeAnim: activity.NOMTYPEANIM
            }
          this.animationTypeList.push(actType);
        });
        //console.log(this.animationTypeList);
      },
      
      });
  }

  onFilterChangeActivities(value: string){
    if(value == 'all'){
      this.activityService.getActivities().subscribe({
        next: (response) => {
          //console.log(response);
          this.activityList = [];
          response.forEach((activity: any) => {
            let act: Activity = {
              codeAnim: activity.CODEANIM,
              dateAct: activity.DATEACT,
              codeEtatAct: activity.CODEETATACT,
              hrRdvAct: activity.HRRDVACT,
              prixAct: activity.PRIXACT,
              hrDebutAct: activity.HRDEBUTACT,
              hrFinAct: activity.HRFINACT,
              dateAnnuleAct: activity.DATEANNULEACT,
              nomResp: activity.NOMRESP,
              prenomResp: activity.PRENOMRESP,
              nomAnim: activity.NOMANIM
              }
            this.activityList.push(act);
          });
          //console.log(this.activityList);
        },
        });
    }else{
      this.activityService.getActivityByAnimType(value).subscribe({
        next: (response) => {
          //console.log(response);
          this.activityList = [];
          response.forEach((activity: any) => {
            let act: Activity = {
              codeAnim: activity.CODEANIM,
              dateAct: activity.DATEACT,
              codeEtatAct: activity.CODEETATACT,
              hrRdvAct: activity.HRRDVACT,
              prixAct: activity.PRIXACT,
              hrDebutAct: activity.HRDEBUTACT,
              hrFinAct: activity.HRFINACT,
              dateAnnuleAct: activity.DATEANNULEACT,
              nomResp: activity.NOMRESP,
              prenomResp: activity.PRENOMRESP,
              nomAnim: activity.NOMANIM
              }
            this.activityList.push(act);
          });
          //console.log(this.activityList);
        },
        });
    }
  };


  registerActivity(activity: Activity){
    this.activityService.registerActivity({username: this.User.firstName, codeanim: activity.codeAnim, dateact: activity.dateAct.toString()}).subscribe({
      next: (response) => {
        //console.log(response);
      }
    });
  }



}

import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';
import { User } from '../_interfaces/user';
import { Router } from '@angular/router';
import { ActivityService } from '../_services/activity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
User?: User;
page: string = '';
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


    this.activityService.getActivities().subscribe({
    next: (response) => {
      console.log(response);
    },
    
    });

    // this.loginService.login({ username: this.username, password: this.password })
    //   .subscribe({
    //     next: (response) => {
    //       if (response['COUNT(*)'] !== 1) {
    //         this.errorMessage = 'Identifiant et/ou mot de passe incorrect';
    //         if (targetDiv != null){
    //           targetDiv.style.display = "none";
    //         } 
    //         return;
    //       }else{
    //         let currentUser: User = {
    //           username: response.USER,
    //           password: response.MDP,
    //           firstName: response.NOMCOMPTE,
    //           lastName: response.PRENOMCOMPTE,
    //           registrationDate: response.DATEINSCRIP,
    //           closingDate: response.DATEFERME,
    //           profileType: response.TYPEPROFIL,
    //           stayStartDate: response.DATEDEBSEJOUR,
    //           stayEndDate: response.DATEFINSEJOUR,
    //           birthDate: response.DATENAISCOMPTE,
    //           mail: response.ADRMAILCOMPTE,
    //           phone: response.NOTELCOMPTE
              
    //       }
    //       this.sessionService.createSession(currentUser);
    //       }
    //       this.Router.navigateByUrl('home');
          
    //     },
    //     error: (error) => {
    //       this.errorMessage = 'Identifiant et/ou mot de passe incorrect';
    //       console.error('Error logging in', error);
    //       if (targetDiv != null){
    //         targetDiv.style.display = "none";
    //       } 
    //     }
    //   });
  }

}

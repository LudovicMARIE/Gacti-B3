import { Component, DestroyRef, Inject, OnInit, inject } from '@angular/core';
import { ActivityService } from '../_services/activity.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Activity, Animation } from '../_interfaces/activity';
import { User } from '../_interfaces/user';

@Component({
  selector: 'app-view-activity-details',
  templateUrl: './view-activity-details.component.html',
  styleUrls: ['./view-activity-details.component.scss']
})
export class ViewActivityDetailsComponent implements OnInit {

  destroyRef = inject(DestroyRef);
  userList: User[] = [];
  currentActivity: Activity = {
    idActivite: 0,
    animation: {
      idAnimation: '',
      nomAnimation: '',
      dateCreationAnimation: new Date(),
      dureeAnimation: 0,
      limiteAge: 0,
      nbPlaceAnimation: 0,
      descriptionAnimation: '',
      typeAnimation: '',
      difficulteAnimation: ''
    },
    prixAct: 0,
    dateAct: new Date(),
    dateAnnulationAct: undefined,
    etatActivite: 'Prévue',
    encadrant: {} as User
  }

  constructor(private activityService: ActivityService,
    public dialogRef: MatDialogRef<ViewActivityDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Activity) { 
      this.activityService.getUserListByActivity(data.idActivite).pipe(takeUntilDestroyed()).subscribe({
        next: (response) => {
          this.userList = [];
          response.forEach((user: User) => {
            this.userList.push(user);
          });
        }
      });

    }

  ngOnInit() {
    this.currentActivity = this.data;
  }

  unRegisterActivity(idUser: string){
    this.activityService.unregisterActivity(idUser, this.data.idActivite).subscribe({
      next: (response) => {
        this.activityService.getUserListByActivity(this.data.idActivite).subscribe({
          next: (response) => {
            this.userList = [];
            response.forEach((user: User) => {
              this.userList.push(user);
            });
          }
        });
      }
    });

  }

}

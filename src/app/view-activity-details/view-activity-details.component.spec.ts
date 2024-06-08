/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViewActivityDetailsComponent } from './view-activity-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../_interfaces/user';

describe('ViewActivityDetailsComponent', () => {
  let component: ViewActivityDetailsComponent;
  let fixture: ComponentFixture<ViewActivityDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewActivityDetailsComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: { 
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
      } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewActivityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

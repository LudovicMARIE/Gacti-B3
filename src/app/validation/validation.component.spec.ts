/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ValidationComponent } from './validation.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('ValidationComponent', () => {
  let component: ValidationComponent;
  let fixture: ComponentFixture<ValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationComponent ],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

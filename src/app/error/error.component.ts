import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ErrorComponent>) { }

  ngOnInit() {
  }

  ok(){
    this.dialogRef.close();
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ValidationComponent>) { }

  ngOnInit() {
  }

  yes(){
    console.log("yes");
    this.dialogRef.close("yes");
  }

  no(){
    console.log("no");
    this.dialogRef.close("no");
  }

}

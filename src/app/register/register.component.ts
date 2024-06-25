import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../_interfaces/user';
import { LoginService } from '../_services/login.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorComponent } from '../error/error.component';
import { ConditionUtilisationsComponent } from '../conditionUtilisations/conditionUtilisations.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  constructor(private loginService: LoginService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<RegisterComponent>) { }

  ngOnInit() {
    this.form = new FormGroup({
      idUser: new FormControl('', Validators.required),
      mdp: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!?\\&@_\\-+=^#%/])[A-Za-z\\d!?\\&@_\\-+=^#%/]{8,}$')]),
      mdpConfirm: new FormControl('', Validators.required),
      nomCompte: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      prenomCompte: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      dateDebSejour: new FormControl('', Validators.required),
      dateFinSejour: new FormControl('', Validators.required),
      adrMailCompte: new FormControl('', [Validators.required, Validators.email]),
      telCompte: new FormControl('', [Validators.required, Validators.pattern('^0\\d{9}$')]),
      termsAccepted: new FormControl(false, Validators.requiredTrue),
    });

  }

  openConditions() {
    this.dialog.open(ConditionUtilisationsComponent);
  }

  onSubmit(){
    if(this.form.invalid){
      console.log("Invalid form");
      for (const field in this.form.controls) {
        if (this.form.get(field)?.invalid) {
          switch(field) {
            case 'idUser':
              console.log('Invalid idUser');
              //afficher message d'erreur
              break;
            case 'mdp':
              console.log('Invalid mdp');
              //afficher message d'erreur
              break;
            case 'mdpConfirm':
              console.log('Invalid mdp');
              //afficher message d'erreur
              break;  
            case 'nomCompte':
              console.log('Invalid nomCompte');
              //afficher message d'erreur
              break;
            case 'prenomCompte':
              console.log('Invalid prenomCompte');
              //afficher message d'erreur
              break;
            case 'dateDebSejour':
              console.log('Invalid dateDebSejour');
              //afficher message d'erreur
              break;
            case 'dateFinSejour':
              console.log('Invalid dateFinSejour');
              //afficher message d'erreur
              break;
            case 'adrMailCompte':
              console.log('Invalid adrMailCompte');
              //afficher message d'erreur
              break;
            case 'telCompte':
              console.log('Invalid telCompte');
              //afficher message d'erreur
              break;
            case 'termsAccepted':
              console.log('Invalid termsAccepted');
              //afficher message d'erreur
              break;
            default:
              console.log('Invalid field: ' + field);
          }
          
        }
      }
      console.log(this.form);
      this.dialog.open(ErrorComponent, {
        width: 'fit-content',
        panelClass: 'custom-dialog-container',
      });
      return;
    }else{
    if(this.form.get('mdp')?.value === this.form.get('mdpConfirm')?.value){
      let user: User ={
        idUser: this.form.get('idUser')?.value,
        mdp: this.form.get('mdp')?.value,
        nomCompte: this.form.get('nomCompte')?.value,
        prenomCompte: this.form.get('prenomCompte')?.value,
        dateInscrip: new Date(),
        dateFerme: undefined,
        typeProfil: 'client',
        dateDebSejour: new Date(this.form.get('dateDebSejour')?.value),
        dateFinSejour: new Date(this.form.get('dateFinSejour')?.value),
        adrMailCompte: this.form.get('adrMailCompte')?.value,
        telCompte: this.form.get('telCompte')?.value,
        activites: []
      }
      console.log(user);
      this.loginService.register(user).subscribe({
        next: (response) => {
          console.log(response);
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Error logging in', error);
        }
      });
    }else{
      this.dialog.open(ErrorComponent, {
        width: 'fit-content',
        panelClass: 'custom-dialog-container',
      });
    }
    
    
  }
  }

}

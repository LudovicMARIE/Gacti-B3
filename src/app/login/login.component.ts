import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../_interfaces/user';
import { SessionService } from '../_services/session.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string | null = null;
  username!: string;
  password!: string;

  constructor(private loginService: LoginService,
    private sessionService: SessionService,
    private Router: Router,
    private dialog: MatDialog,) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }



  onSubmit(): void {
    const targetDiv = document.getElementById("loading");
    if (targetDiv != null){
      targetDiv.style.display = "block";
    } 
    this.errorMessage = null;
    this.username = this.form.get('username')?.value;
    this.password = this.form.get('password')?.value;
    this.username = this.username.toLowerCase();
    this.loginService.login({ mail: this.username, mdp: this.password })
      .subscribe({
        next: (response) => {
          console.log(response);

            let currentUser: User = {
              idUser: response.idUser,
              mdp: response.password,
              nomCompte: response.nomCompte,
              prenomCompte: response.prenomCompte,
              dateInscrip: response.dateInscrip,
              dateFerme: response.dateFerme,
              typeProfil: response.typeProfil,
              dateDebSejour: response.dateDebSejour,
              dateFinSejour: response.dateFinSejour,
              adrMailCompte: response.adrMailCompte,
              telCompte: response.telCompte,
              activites: response.activites,
            }
          this.sessionService.createSession(currentUser);
          this.Router.navigateByUrl('home');
          
        },
        error: (error) => {
          this.errorMessage = 'Identifiant et/ou mot de passe incorrect';
          console.error('Error logging in', error);
          if (targetDiv != null){
            targetDiv.style.display = "none";
          } 
        }
      });
  }

  openRegisterComponent(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: 'fit-content',
      panelClass: 'custom-dialog-container',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

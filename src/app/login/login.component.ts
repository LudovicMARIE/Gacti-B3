import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../_interfaces/user';
import { SessionService } from '../_services/session.service';
import { Router } from '@angular/router';

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
    private Router: Router) { }

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
    this.loginService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (response) => {
          if (response['COUNT(*)'] !== 1) {
            this.errorMessage = 'Identifiant et/ou mot de passe incorrect';
            if (targetDiv != null){
              targetDiv.style.display = "none";
            } 
            return;
          }else{
            let currentUser: User = {
              username: response.USER,
              password: response.MDP,
              firstName: response.NOMCOMPTE,
              lastName: response.PRENOMCOMPTE,
              registrationDate: response.DATEINSCRIP,
              closingDate: response.DATEFERME,
              profileType: response.TYPEPROFIL,
              stayStartDate: response.DATEDEBSEJOUR,
              stayEndDate: response.DATEFINSEJOUR,
              birthDate: response.DATENAISCOMPTE,
              mail: response.ADRMAILCOMPTE,
              phone: response.NOTELCOMPTE
              
          }
          this.sessionService.createSession(currentUser);
          }
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

}

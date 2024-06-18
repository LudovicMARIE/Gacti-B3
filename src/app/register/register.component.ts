import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../_interfaces/user';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.form = new FormGroup({
      idUser: new FormControl('', Validators.required),
      mdp: new FormControl('', Validators.required),
      nomCompte: new FormControl('', Validators.required),
      prenomCompte: new FormControl('', Validators.required),
      dateDebSejour: new FormControl('', Validators.required),
      dateFinSejour: new FormControl('', Validators.required),
      adrMailCompte: new FormControl('', Validators.required),
      telCompte: new FormControl('', Validators.required),

    });
  }

  onSubmit(){
    if(this.form.invalid){
      console.log("Invalid form");
      console.log(this.form);
      return;
    }else{

    
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
      },
      error: (error) => {
        console.error('Error logging in', error);
      }
    });
  }
  }

}

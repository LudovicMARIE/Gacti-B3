import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage!: string;
  username!: string;
  password!: string;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }



  onSubmit(): void {
    this.username = this.form.get('username')?.value;
    this.password = this.form.get('password')?.value;
    this.loginService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (response) => {
          console.log('Login successful', response);
          // Handle successful login here (e.g., routing, storage)
        },
        error: (error) => {
          this.errorMessage = 'Login failed';
          console.error('Error logging in', error);
        }
      });
  }
}

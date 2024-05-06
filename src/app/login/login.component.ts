import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

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
          this.errorMessage = 'Identifiant et/ou mot de passe incorrect';
          console.error('Error logging in', error);
        }
      });
  }

  /*
  $sql = "SELECT COUNT(*),TYPEPROFIL,NOMCOMPTE,PRENOMCOMPTE,DATEINSCRIP, DATE_FORMAT(DATEINSCRIP,'%d/%m/%Y') AS DATEINSCRIPFORMAT,DATEFERME,DATEDEBSEJOUR,DATE_FORMAT(DATEDEBSEJOUR,'%d/%m/%Y') AS DATEDEBSEJOURFORMAT,DATEFINSEJOUR,DATE_FORMAT(DATEFINSEJOUR,'%d/%m/%Y') AS DATEFINSEJOURFORMAT,DATENAISCOMPTE,DATE_FORMAT(DATENAISCOMPTE,'%d/%m/%Y') AS DATENAISCOMPTEFORMAT,ADRMAILCOMPTE,NOTELCOMPTE FROM compte WHERE USER = '$username' and MDP = '$password'";
  $query = mysqli_query($con,$sql);
  $result = mysqli_fetch_assoc($query);
  $typeprofil = $result['TYPEPROFIL'];
  $nomcompte = $result['NOMCOMPTE'];
  $prenomcompte = $result['PRENOMCOMPTE'];
  $DATEINSCRIP = $result['DATEINSCRIPFORMAT'];
  $DATEFERME = $result['DATEFERME'];
  $DATEDEBSEJOUR = $result['DATEDEBSEJOURFORMAT'];
  $DATEFINSEJOUR = $result['DATEFINSEJOURFORMAT'];
  $DATENAISCOMPTE = $result['DATENAISCOMPTEFORMAT'];
  $ADRMAILCOMPTE = $result['ADRMAILCOMPTE'];
  $NOTELCOMPTE = $result['NOTELCOMPTE'];
  
  $result = mysqli_query($con, $sql);
  $row = $result->fetch_assoc();
  $counter = (int) $row["COUNT(*)"];
  if ($counter != 1) {
      header("location:../index.php?var=wrong");
  }else {
      mysqli_close($con);
      session_start();
      $_SESSION['Username'] = $username;
      $_SESSION['TypeCompte'] = $typeprofil;
      $_SESSION['nomCompte'] = $nomcompte;
      $_SESSION['prenomCompte'] = $prenomcompte;
      $_SESSION['DATEINSCRIP'] = $DATEINSCRIP;
      $_SESSION['DATEFERME'] = $DATEFERME;
      $_SESSION['DATEDEBSEJOUR'] = $DATEDEBSEJOUR;
      $_SESSION['DATEFINSEJOUR'] = $DATEFINSEJOUR;
      $_SESSION['DATENAISCOMPTE'] = $DATENAISCOMPTE;
      $_SESSION['ADRMAILCOMPTE'] = $ADRMAILCOMPTE;
      $_SESSION['NOTELCOMPTE'] = $NOTELCOMPTE;
      
      if ($typeprofil == 0) {
          header("location:../users/admin/admin.php");
      }elseif ($typeprofil == 2) {
          header("location:../users/encadrant/main.php");
      }else {
          header("location:../users/visiteur/main.php");
      }
    
}?>



  */
}

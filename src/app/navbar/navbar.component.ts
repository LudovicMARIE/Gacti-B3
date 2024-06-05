import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';
import { Router } from '@angular/router';
import { User } from '../_interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
currentUser: User = {
  idUser: '',
  mdp: '',
  nomCompte: '',
  prenomCompte: '',
  dateInscrip: new Date(),
  dateFerme: new Date(),
  typeProfil: 'client',
  dateDebSejour: new Date(),
  dateFinSejour: new Date(),
  adrMailCompte: '',
  telCompte: '',
  activites: []
}

  constructor(private SessionService: SessionService,
    private router: Router) { }

  ngOnInit() {
    this.currentUser = this.SessionService.getUser();
  }


  test(){
    console.log("test");
  }

  disconnectUser(){
    this.SessionService.destroySession();
    this.router.navigateByUrl('');
  }

  changePage(pageSelected: string){
    this.SessionService.setCurrentPage(pageSelected);
  }
}

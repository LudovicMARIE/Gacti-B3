import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { User } from '../_interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
currentUser: User = this.SessionService.getUser();

  constructor(private SessionService: SessionService,
    private router: Router,
    private homeComponent: HomeComponent) { }

  ngOnInit() {
  }


  test(){
    console.log("test");
  }

  disconnectUser(){
    this.SessionService.destroySession();
    this.router.navigateByUrl('');
  }

  changePage(pageSelected: string){
    this.homeComponent.page = pageSelected;
  }
}

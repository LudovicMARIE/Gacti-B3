import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private SessionService: SessionService,
    private router: Router) { }

  ngOnInit() {
  }


  test(){
    console.log("test");
  }

  disconnectUser(){
    this.SessionService.destroySession();
    this.router.navigateByUrl('');
  }
}

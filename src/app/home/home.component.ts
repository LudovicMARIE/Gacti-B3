import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';
import { User } from '../_interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
User?: User;
  constructor(private SessionService: SessionService,
    private router: Router) { }

  ngOnInit() {
    if(this.SessionService.getUser() == null){
      this.router.navigateByUrl('');
    }else{
      console.log(this.SessionService.getUser());
      this.User = this.SessionService.getUser();
    }
    
  }

}

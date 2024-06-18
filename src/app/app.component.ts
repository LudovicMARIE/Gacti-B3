import { Component } from '@angular/core';
import { HttpClientService } from './_services/http-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GACTI-B3';

  constructor(private http: HttpClientService){}

  ngOnInit(){
    // this.http.getCsrf();
  }
}

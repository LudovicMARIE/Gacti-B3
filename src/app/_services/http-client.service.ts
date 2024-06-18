import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  csrfToken: string = "";

constructor(private http: HttpClient) { }


// getCsrf(): void{
//   this.http.get('/api/csrf/token').subscribe(
//     (data: any) => this.csrfToken = data.token
//   );
// }

get (url: string): any{
  return this.http.get(url, 
    {withCredentials: true, headers: new HttpHeaders({"X-CSRF-TOKEN": this.csrfToken})});
}

post(url: string, data: any): any{
  return this.http.post(url, data, {withCredentials: true});
}

put (url: string, data: any): any{
  return this.http.put(url, data, {withCredentials: true});
}

delete (url: string): any{
  return this.http.delete(url, {withCredentials: true});
}
}

//https://www.youtube.com/watch?v=tgjLsEmxcuY&ab_channel=TheDevWorld-bySergioLema

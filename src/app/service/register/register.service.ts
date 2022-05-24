import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers : new HttpHeaders({'Content-Type' : 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient : HttpClient) { }

  register_sv(newUser : any){
    var api = "http://localhost:9000/api/user-accounts/signup"
    return this.httpClient.post<any>(api, newUser, httpOptions);
  }
}

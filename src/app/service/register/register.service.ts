import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers : new HttpHeaders({'Content-Type' : 'Application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient : HttpClient) { }

  private apiUrl = "";

  register_sv(newUser : any){
    return this.httpClient.post(this.apiUrl, newUser);
  }
}

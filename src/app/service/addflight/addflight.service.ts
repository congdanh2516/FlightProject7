import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../login/login.service';

const httpOtions = {
  headers : new HttpHeaders({'Content-Type' : 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AddflightService {

  constructor(private httpClient : HttpClient, private login : LoginService) {}


  getAirportFrom(){
    return this.httpClient.get("http://localhost:3000/airportfrom", httpOtions);
  }

  getAirportTo(){
    return this.httpClient.get("http://localhost:3000/airportto", httpOtions);
  }

  addFlight(flight : any){
    let headers = new HttpHeaders()
      .set('Authorization' , `bearer ${this.login.getAuthToken()}`)
      .set("Content-Type", "Application/json");
    return this.httpClient.post("http://localhost:9000/api/flights/add", flight, {headers : headers});
  }
}

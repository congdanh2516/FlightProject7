import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const httOptions = {
  headers : new Headers({'Content-Type' : 'Application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient : HttpClient) { }

  private apiUrl = "http://localhost:9000/api/flights/find";

  search_sv(flight : any) : Observable<any> {
    // let params = new HttpParams()
    // .set('origin', flight.origin)
    // .set('destination', flight.destination)
    // .set('type', flight.type)
    // .set('departDate', flight.departDate)
    // .set('returnDate', flight.returnDate)
    // .set('quantityPassenger', flight.quantityPassenger)

    //return this.httpClient.get(this.apiUrl, {params : params});

    var api = `http://localhost:9000/api/flights/find/${flight.origin}/${flight.destination}/${flight.departDate}/${flight.quantityPassenger}`;
    return this.httpClient.get(api);
  }

  getAirportList(){
    var api = "http://localhost:9000/api/airportNames"
    return this.httpClient.get<any>(api);
  }

  search_name_airport(code : string){
    var api = `http://localhost:9000/api/airportNames/${code}`;
    return this.httpClient.get<any>(api);
  }

  search_by_id(id : string) : Observable<any> {
    var api = `http://localhost:9000/api/flights/${id}`;
    return this.httpClient.get<any>(api);
  }

  addHour(departHour : number, departMinute : number, durationHour : number, durationMinute : number){
    var timeHour : string;
    var timeMinute : string;
    departMinute += durationMinute;
    if(departMinute >= 60){
      departHour ++;
      departMinute = departMinute - 60;
    } 

    departHour += durationHour;
    if(departHour >= 24){
      departHour -= 24;
    }

    timeHour = departHour.toString();
    timeMinute = departMinute.toString();

    if(timeHour.length == 1){
      timeHour = "0" + timeHour;
    }

    if(timeMinute.length == 1){
      timeMinute = "0" + timeMinute;
    }

    return timeHour + ":" + timeMinute;
  }

  addHour1(departHour : number, departMinute : number, durationHour : number, durationMinute : number){
    var timeHour : string;
    var timeMinute : string;
    departMinute += durationMinute;
    if(departMinute >= 60){
      departHour ++;
      departMinute = departMinute - 60;
    } 

    departHour += durationHour;
    if(departHour >= 24){
      departHour -= 24;
    }

    timeHour = departHour.toString();
    timeMinute = departMinute.toString();

    if(timeHour.length == 1){
      timeHour = "0" + timeHour;
    }

    if(timeMinute.length == 1){
      timeMinute = "0" + timeMinute;
    }

    return timeHour + "h" + timeMinute + "m";
  }

  formatHour(x : number){
    var s = x.toString();
    if(s.length == 1){
      s = "0" + s;
    }
    return s;
  }


  searchTicket(ticketCode : any){
    // let header = new HttpHeaders()
    // .set("Content-type", "application/json");
    let api= `http://localhost:9000/api/info-flight/${ticketCode}`;
    return this.httpClient.get<any>(api);
    
  }
  

  getPassengerList(){
    
  }
}

  

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

  private apiUrl = "";

  search_sv(flight : any) : Observable<any> {
    let params = new HttpParams()
    .set('from', flight.from)
    .set('to', flight.to)
    .set('type', flight.type)
    .set('startDate', flight.startDate)
    .set('backDate', flight.backDate)
    .set('quatity', flight.quatity)

    return this.httpClient.get(this.apiUrl, {params : params});
  }
}

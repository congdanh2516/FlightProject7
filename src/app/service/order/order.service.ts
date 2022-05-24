import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NumberSymbol } from '@angular/common';

const httpOptions = {
  headers : new HttpHeaders({'Content-Type' : 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient : HttpClient) { }

  setUserInfo(user : any){
    let api = "http://localhost:9000/api/info-users/add";
    return this.httpClient.post(api, user, httpOptions);
  }

  setFlightTicket(ticket : any){
    let api = "http://localhost:9000/api/info-flight/add";
    return this.httpClient.post(api, ticket, httpOptions);
  }

  senCode(mail : any){
    let api = "http://localhost:9000/api/info-flight/send-code";
    return this.httpClient.post<any>(api, mail, httpOptions);
  }

  verify(code : any){
    let api = "http://localhost:9000/api/info-flight/check-code";
    return this.httpClient.post<any>(api, code, httpOptions);
  }

  sendMail(mailList : any){
    var api = "http://localhost:9000/api/info-flight/mail"
    return this.httpClient.post<any>(api, mailList, httpOptions);
  }

  amountDateInMonth(month : number, year : number) : number{
    var amountDate : number = 0;
    switch(month){
      case 1: 
        amountDate = 31;
        console.log(amountDate);
        break
      case 2:
        if(year % 400 == 0)
          amountDate = 29;
        else amountDate = 28;
        break;
      case 3:
        amountDate = 31;
        break;
      case 4: 
        amountDate = 30;
        break;
      case 5: 
        amountDate = 31;
        break;
      case 6: 
        amountDate = 30;
        break;
      case 7: 
        amountDate = 31;
        break;
      case 8: 
        amountDate = 31;
        break;
      case 9: 
        amountDate = 30;
        break;
      case 10: 
        amountDate = 31;
        break;
      case 11: 
        amountDate = 30;
        break;
      case 12: 
        amountDate = 31;
        break;
    }

    return amountDate;
  }

  checkValiDate(date : number, month : NumberSymbol, year : number) : boolean {
    console.log(this.amountDateInMonth(month, year));
    if(date > 31 || year < 1890 || date > this.amountDateInMonth(month, year))
      return false;
    return true;
  }
}

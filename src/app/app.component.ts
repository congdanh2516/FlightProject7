import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import * as AOS from 'aos';
import { render } from 'creditcardpayments/creditCardPayments';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(){}
  
  ngOnInit(): void {
    AOS.init();
  }
  
  title = 'FlightProject';
  faCoffee = faCoffee;
 
  
  
}

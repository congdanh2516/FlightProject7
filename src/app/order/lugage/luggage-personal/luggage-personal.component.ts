import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';

@Component({
  selector: 'app-luggage-personal',
  templateUrl: './luggage-personal.component.html',
  styleUrls: ['./luggage-personal.component.css']
})
export class LuggagePersonalComponent implements OnInit, OnDestroy, OnChanges {

  constructor(private storage : LocalstorageService) {
    console.log(this.no);

  }

  ngOnInit(): void {
   
  }


  change : boolean = false;
  ngOnChanges(): void {
    var services : any[] = [];
    services = this.storage.getItem('services');

    var service_passenger : any[] = [];
    service_passenger = services[this.no-1];

    var service_trip : any = {};
    service_trip = service_passenger[this.flightOrder];

    if(this.change == false){
      this.suitcase10 = service_trip.luggage.LG010;
      this.suitcase23 = service_trip.luggage.LG023;
      this.suitcaseQuantity = this.suitcase10 + this.suitcase23;
      this.total = this.suitcase10*162000 + this.suitcase23*270000;
      this.change=true;
    }
    else {
      console.log("Hello");
      service_trip.luggage.LG010 = this.suitcase10;
      service_trip.luggage.LG023 = this.suitcase23;
      console.log(service_trip);
      service_passenger[this.flightOrder] = service_trip;
      services[this.no-1] = service_passenger;
      this.storage.setItem('services', services);
    }

      
  }

  ngOnDestroy(): void {
      
  }


  @Input()firstName : string;
  @Input()lastName : string;
  @Input()no : number;
  @Input()add : boolean;
  @Input()flightOrder : number;

  suitcase10 : number = 0;
  suitcase23 : number = 0;

  suitcaseQuantity : number = 0;
  total : number = 0;
  
  quantityChange(){
    this.suitcaseQuantity = this.suitcase10 + this.suitcase23;
    this.total =  162000*this.suitcase10 + 270000*this.suitcase23;
    console.log(this.suitcaseQuantity +  this.total)
  }
}

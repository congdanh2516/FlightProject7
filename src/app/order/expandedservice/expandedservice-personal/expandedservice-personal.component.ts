import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';

@Component({
  selector: 'app-expandedservice-personal',
  templateUrl: './expandedservice-personal.component.html',
  styleUrls: ['./expandedservice-personal.component.css']
})
export class ExpandedservicePersonalComponent implements OnInit, OnDestroy, OnChanges {

  constructor(private storage : LocalstorageService) { }

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
      this.meal = service_trip.meal;
      this.health = service_trip.health;
      this.crip = service_trip.crip;
      this.change=true;
    }
    else {
      service_trip.meal = this.meal;
      service_trip.health = this.health;
      service_trip.crip = this.crip;
      
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

  mealList = [
    {id : 'ML001', name : "Vegetarian Meal"},
    {id : 'ML002', name : 'Halal Meal'},
    {id : 'ML003', name : 'Fruit Meal'}
  ]

  meal : string = "";
  health : boolean;
  crip : boolean;
}

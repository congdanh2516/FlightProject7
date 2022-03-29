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
    console.log(this.add);
      var passenger = this.storage.getItem('passenger');
      console.log(passenger);
      var services : { meal?: string, health?: boolean, crip? : boolean} = {};

      var passengerno : Object = new Object(passenger[this.no-1]);
      
      if(this.change==false){
        if('services' in passengerno){
          this.meal = passenger[this.no-1].services.meal;
          this.health = passenger[this.no-1].services.health;
          this.crip = passenger[this.no-1].services.crip;
        }
        this.change=true;
      }
      else {
        services.meal = this.meal;
        services.health = this.health;
        services.crip = this.crip;

      if(this.meal == ""){
        delete services.meal;
      }

      if(this.health == false){
        delete services.health;
      }

      if(this.crip == false){
        delete services.crip;
      }

      console.log(services);

      passenger[this.no-1].services = services;
      if((JSON.stringify(services) == JSON.stringify({}))){
        delete passenger[this.no-1].services;
      }
      this.storage.setItem('passenger', passenger);
      }

      
  }
  

  ngOnDestroy(): void {
      
  }

  @Input()firstName : string;
  @Input()lastName : string;
  @Input()no : number;
  @Input()add : boolean;

  mealList = [
    {id : 'ML001', name : "Vegetarian Meal"},
    {id : 'ML002', name : 'Halal Meal'},
    {id : 'ML003', name : 'Fruit Meal'}
  ]

  meal : string = "";
  health : boolean;
  crip : boolean;
}

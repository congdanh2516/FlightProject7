import { Component, OnInit } from '@angular/core';
import { faWheelchair } from '@fortawesome/free-solid-svg-icons';
import { faBaby } from '@fortawesome/free-solid-svg-icons';
import { faBurger } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';
import { SearchService } from 'src/app/service/search/search.service';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-expandedservice',
  templateUrl: './expandedservice.component.html',
  styleUrls: ['./expandedservice.component.css']
})
export class ExpandedserviceComponent implements OnInit {

  passengerlist : any[] = [];

  origin : any;
  destination : any;
  constructor(private storage : LocalstorageService, private search : SearchService) { 
    this.popup = false;
    var flight_searched : any = {};
    flight_searched = this.storage.getItem('flight_searched');

    this.search.search_name_airport(flight_searched.origin).subscribe(
      data => 
      {
        this.origin = data.result;
        this.origin = this.origin[0].name.toUpperCase();
      }
    )

    this.search.search_name_airport(flight_searched.destination).subscribe(
      data =>
      {
        this.destination = data.result;
        this.destination = this.destination[0].name.toUpperCase();
      }
    )
  }

  ngOnInit(): void {
  }

  //icon
  faWheelChair = faWheelchair;
  faBaby = faBaby;
  faBurger = faBurger;
  faChevronRight = faChevronRight;
  faCircleCheck  = faCircleCheck;

  //select


  luggage = [
    {id : 'LG010', weight : 10, price : 162000},
    {id : 'LG023', weight : 23, price : 270000}
  ]

  openService(){
    this.passengerlist = this.storage.getItem('passenger');
  }

  add : boolean = false;
  addService(){
    this.add = !this.add;
    this.disableButton=true;
    
    setTimeout(() => {
      this.popup=true;
    }, 500)

    setTimeout(() => {
      this.popup=false;
      this.disableButton=false;
    }, 3500)
  }

  trip : boolean = this.storage.getItem('flight_searched').type;

  popup : boolean = false;
  disableButton : boolean = false;
  
}

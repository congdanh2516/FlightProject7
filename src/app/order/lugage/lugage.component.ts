import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';
import { SearchService } from 'src/app/service/search/search.service';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lugage',
  templateUrl: './lugage.component.html',
  styleUrls: ['./lugage.component.css']
})
export class LugageComponent implements OnInit {

  passengerlist : any;

  origin : any;
  destination : any;
  constructor(private storage : LocalstorageService, private search : SearchService) {
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

  @Output('updateTripTotal')
  onHanleTripTotal = new EventEmitter<boolean>();

  @Input()passenger : any;

  //icon
  faSuitcaseRolling = faSuitcaseRolling;
  faChevronRight = faChevronRight;
  faCircleCheck  = faCircleCheck;

  //var
  suitcase10 : number = 0;
  suitcase23 : number = 0;

  suitcaseQuantity : number = 0;
  total : number = 0;

  quantityChange(){
    this.suitcaseQuantity = this.suitcase10 + this.suitcase23;
    this.total =  162000*this.suitcase10 + 270000*this.suitcase23;
    console.log(this.suitcaseQuantity +  this.total)
  }

  openLuggage(){
    this.passengerlist = this.storage.getItem('passenger');
  }

  add : boolean = false;
  addLuggage(){
    this.add = !this.add;
    this.disableButton=true;
    
    setTimeout(() => {
      this.popup=true;
    }, 500)

    setTimeout(() => {
      this.popup=false;
      this.disableButton=false;
    }, 3500)

    this.onHanleTripTotal.emit(this.add);
  }

  trip : boolean = this.storage.getItem('flight_searched').type;

  popup : boolean = false;
  disableButton : boolean = false;

}

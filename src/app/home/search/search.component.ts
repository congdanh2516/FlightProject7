import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { SearchService } from 'src/app/service/search/search.service';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { SharingdataService } from 'src/app/service/sharingdata/sharingdata.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy{

  airportFrom : any[] = [];
  airportTo : any[] = [];

  minDate : Date;
  
  constructor(private searchService : SearchService, private storage : LocalstorageService, private router : Router, private data : SharingdataService) { 

    //set minDate
    this.minDate = new Date();

    this.getAirportLits( (data : any) => {
      this.airportFrom = _.cloneDeep(data.result);
      this.airportTo = _.cloneDeep(data.result)
    });

    this.data.changeMessage(false);
  }

  message : boolean;
  subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message)
  }

  changeBlur() {
    this.data.changeMessage(true);
  }

  ngOnDestroy()  {
  }

  airportList : any;


  customer_amount = [
    {value : 1, viewValue : '1 passenger'},
    {value : 2, viewValue : '2 passenger'},
    {value : 3, viewValue : '3 passenger'},
    {value : 4, viewValue : '4 passenger'}
  ]

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  @Input()panelOpenState : string = 'false';
  @Input()originCode : string;
  @Input()destinationCode : string;
  @Input()type : boolean = false;
  @Input()departDate : Date;
  @Input()returnDate : Date;
  @Input()quantityPassenger : number;


  flights : any[];

  storageName :  any;

  search(){

    const flight = {
      origin : this.originCode,
      destination : this.destinationCode,
      type : this.type,
      departDate : this.departDate,
      returnDate : this.returnDate,
      quantityPassenger : this.quantityPassenger
    }

    this.storage.setItem('flight_searched', flight);

    this.router.navigate(['/list', flight.origin, flight.destination, flight.type.toString(),flight.departDate.toString(), flight.quantityPassenger, 'depart'])
    .then(() => {
      window.location.reload();
    });
  }

  getAirportLits(callback : Function){
    this.searchService.getAirportList().subscribe(
      data => {
        console.log("Airport List")
        this.airportList = data.result;
        console.log(this.airportList)
        callback(data)
      }
    )
  }

  exceptAirport(event : any, type : string){
    // this.airportFrom = _.cloneDeep(this.airportList);
    // this.airportTo = _.cloneDeep(this.airportList);
    this.airportTo = [...this.airportList];
    this.airportFrom = [...this.airportList];
    if(type == "from"){
      for(var i = 0; i <  this.airportTo.length; i++){
        if(this.airportTo[i].id == event.value){
          this.airportTo.splice(i,1);
        }
      }
    }

    if(type == "to"){
      for(var i = 0; i <  this.airportFrom.length; i++){
        if(this.airportFrom[i].id == event.value){
          this.airportFrom.splice(i,1);
        }
      }
    }

  }


}

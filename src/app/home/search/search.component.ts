import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { SearchService } from 'src/app/service/search/search.service';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy{

  constructor(private searchService : SearchService, private storage : LocalstorageService, private router : Router) { 
    
  }

  ngOnInit(): void {
  }

  ngOnDestroy()  {
  }

  location = [
    {value : 'HAN', viewValue : 'Hà Nội'},
    {value : 'SGN', viewValue : 'TP Hồ Chi Minh'},
    {value : 'VCA', viewValue : 'Can Tho'},
    {value : 'DAD', viewValue : 'Da Nang'}
  ];

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


  //tim kiem
  // origin : string;
  // destination : string;
  // //type : boolean = false;
  // departDate : Date;
  // returnDate : Date;
  // quantityPassenger : number;

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

    this.storage.setItem('flight', flight);
    this.storage.setItem('flight_searched', flight);
    
    this.router.navigateByUrl('/flightlist');
    location.reload();
  }

}

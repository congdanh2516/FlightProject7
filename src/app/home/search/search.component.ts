import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { SearchService } from 'src/app/service/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private searchService : SearchService) { }

  ngOnInit(): void {
  }

  location = [
    {value : 'HAN', viewValue : 'Hà Nội'},
    {value : 'SGN', viewValue : 'TP Hồ Chi Minh'}
  ];

  customer_amount = [
    {value : 1, viewValue : '1 hành khách'},
    {value : 2, viewValue : '2 hành khách'},
    {value : 3, viewValue : '3 hành khách'},
    {value : 4, viewValue : '4 hành khách'}
  ]

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  panelOpenState : boolean =false;

  oneway : boolean = false;

  //tim kiem
  flight : any = {
    from : '',
    to : '',
    type : '',
    startDate : '',
    backDate : '',
    quantity : ''
  }

  flights : any[];

  search(flight : any){
    this.searchService.search_sv(flight).subscribe(
      data => this.flights = data
    )
  }

}

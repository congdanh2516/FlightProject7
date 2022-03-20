import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../service/localstorage/localstorage.service';
import { SearchService } from '../service/search/search.service';

@Component({
  selector: 'app-flightlist',
  templateUrl: './flightlist.component.html',
  styleUrls: ['./flightlist.component.css']
})
export class FlightlistComponent implements OnInit {

  constructor(private search : SearchService, private storage : LocalstorageService) { 

  }

  flights : any[];

  ngOnInit(): void {
    
  }


}

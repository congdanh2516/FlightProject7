import { Component, OnInit } from '@angular/core';
import { faWheelchair } from '@fortawesome/free-solid-svg-icons';
import { faBaby } from '@fortawesome/free-solid-svg-icons';
import { faBurger } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';

@Component({
  selector: 'app-expandedservice',
  templateUrl: './expandedservice.component.html',
  styleUrls: ['./expandedservice.component.css']
})
export class ExpandedserviceComponent implements OnInit {

  passengerlist : any;
  constructor(private storage : LocalstorageService) { 
    this.passengerlist = this.storage.getItem('passenger');
  }

  ngOnInit(): void {
  }

  //icon
  faWheelChair = faWheelchair;
  faBaby = faBaby;
  faBurger = faBurger;
  faChevronRight = faChevronRight;

  //select


  luggage = [
    {id : 'LG010', weight : 10, price : 162000},
    {id : 'LG023', weight : 23, price : 270000}
  ]

  
}

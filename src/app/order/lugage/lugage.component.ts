import { Component, Input, OnInit } from '@angular/core';
import { faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';

@Component({
  selector: 'app-lugage',
  templateUrl: './lugage.component.html',
  styleUrls: ['./lugage.component.css']
})
export class LugageComponent implements OnInit {

  passengerlist : any;
  constructor(private storage : LocalstorageService) {
   
  }

  ngOnInit(): void {
  }

  @Input()passenger : any;

  //icon
  faSuitcaseRolling = faSuitcaseRolling;
  faChevronRight = faChevronRight;

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
  }

  trip : boolean = true;

}

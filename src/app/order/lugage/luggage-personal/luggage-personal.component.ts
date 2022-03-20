import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-luggage-personal',
  templateUrl: './luggage-personal.component.html',
  styleUrls: ['./luggage-personal.component.css']
})
export class LuggagePersonalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()firstName : string;
  @Input()lastName : string;
  @Input()no : number;

  suitcase10 : number = 0;
  suitcase23 : number = 0;

  suitcaseQuantity : number = 0;
  total : number = 0;
  
  quantityChange(){
    this.suitcaseQuantity = this.suitcase10 + this.suitcase23;
    this.total =  162000*this.suitcase10 + 270000*this.suitcase23;
    console.log(this.suitcaseQuantity +  this.total)
  }
}

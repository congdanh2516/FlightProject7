import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';

@Component({
  selector: 'app-luggage-personal',
  templateUrl: './luggage-personal.component.html',
  styleUrls: ['./luggage-personal.component.css']
})
export class LuggagePersonalComponent implements OnInit, OnDestroy, OnChanges {

  constructor(private storage : LocalstorageService) {
    console.log(this.no);

  }

  ngOnInit(): void {
    // var passenger = this.storage.getItem('passenger');
    // var luggageLocal : any = {};
    // var passengerno : Object = new Object(passenger[0]);
    // console.log('luggage' in passengerno);
    // if('luggage' in passengerno){
    //   console.log("No");
    //   console.log(this.no);
    //   console.log(typeof(this.no));
    //   let index = Number(this.no)-1;
    //   luggageLocal = passenger[index].luggage;
    //   this.suitcase10 = luggageLocal.LG010 | 0; 
    //   this.suitcase23 = luggageLocal.LG023 | 0;
    // }
  }

  test = {
    var1 : "dssdf",
    var2 : "dsfdsw"
  }

  change : boolean = false;
  ngOnChanges(): void {
    console.log(this.add);
      var passenger = this.storage.getItem('passenger');
      console.log(passenger);
      var luggage : { LG010?: number, LG023?: number} = {LG010 : 0, LG023 : 0};

      var passengerno : Object = new Object(passenger[this.no-1]);
      
      if(this.change==false){
        if('luggage' in passengerno){
          this.suitcase10 = passenger[this.no-1].luggage.LG010 | this.suitcase10;
          this.suitcase23 = passenger[this.no-1].luggage.LG023 | this.suitcase23;
        }
        this.change=true;
      }
      else {
        luggage.LG010 = this.suitcase10;
        luggage.LG023 = this.suitcase23;

      if(this.suitcase10 == 0){
        delete luggage.LG010;
      }

      if(this.suitcase23 == 0){
        delete luggage.LG023;
      }
      console.log(luggage);

      passenger[this.no-1].luggage = luggage;
      if((JSON.stringify(luggage) == JSON.stringify({}))){
        delete passenger[this.no-1].luggage;
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

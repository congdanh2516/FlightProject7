import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.css']
})
export class SpecificationComponent implements OnInit {

  flight_searched : any;
  flight_return : any;
  departure : boolean; //khu hoi, chon may chuyen r
  constructor(private storage : LocalstorageService, private router : Router) {
    this.flight_searched = this.storage.getItem('flight_searched');
    this.departure = this.storage.getItem('departure');
  }

  ngOnInit(): void {
  }

  @Input()arrivedDateTime : string;
  @Input()departTime : string;
  @Input()arrivedTime : string;
  @Input()departTime1 : string;
  @Input()originCode : string;
  @Input()originName : string;
  @Input()destinationName : string;
  @Input()destinationCode : string;
  @Input()departDate : Date;
  @Input()hours : number;
  @Input()minutes : number;
  @Input()aircraftName : string;
  @Input()economyPrice : number;
  @Input()businessPrice : number;
  
  @Input()flightCode : string;

  @Input()href : string; //#
  @Input()id : string;

  @Input()cfc : string;

  @Input()turn : string;


  //arrivedTime  : Date;

  //icon
  faPlane = faPlane;
  faCircleInfo = faCircleInfo;

  labelDetail : boolean = true;
  labelDetailName : string = "Show Detail";

  changeLabel(){
    this.labelDetail=!this.labelDetail;
    if(this.labelDetail){
      this.labelDetailName="Show Detail"
    }
    else this.labelDetailName="Hide Detail"
  }


  choose_eco : boolean = false;
  choose_bus : boolean = false;
  choose(option : string){
    if(option == 'eco')
    {
      this.choose_eco = !this.choose_eco;
      if(this.choose_eco)
      {
        this.choose_bus = false;
      }
    }
    else 
    {
      this.choose_bus = !this.choose_bus;
      if(this.choose_bus)
      {
        this.choose_eco = false;
      }
    }
  }

  chooseFlight(flightCode : string, type : string, price : number){

    var cfc : any[] = []; //mang ma chuyen bay da chon
    var option : Object = {
      flightCode: this.cfc,
      type : type,
    }

    console.log(flightCode + type + price);
    
    //one way
    if(this.flight_searched.type) {
      cfc.push(option);
      this.storage.setItem('cfc', cfc);
      this.router.navigateByUrl('/purchase');
    }
    else //round trip
    {
      if(this.turn == 'return'){ //da chon chuyen di
        cfc = this.storage.getItem('cfc');
        if(cfc.length==2){
          cfc.pop();
        }
        cfc.push(option);
        this.storage.setItem('cfc', cfc);
        this.router.navigateByUrl('/purchase');
      }
      else //chon chuyen di, dieu huong den chonj chuyen ve
      {
        cfc.push(option);
        this.storage.setItem('cfc', cfc);
        this.router.navigate(['/list', this.flight_searched.destination, this.flight_searched.origin, this.flight_searched.type.toString(), this.flight_searched.returnDate.toString(), this.flight_searched.quantityPassenger, 'return']);
      }
    }
    
  }
  
}

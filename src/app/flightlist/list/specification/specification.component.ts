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

  flight : any;
  flight_return : any;
  departure : boolean; //khu hoi, chon may chuyen r
  constructor(private storage : LocalstorageService, private router : Router) {
    this.flight = this.storage.getItem('flight');
    this.departure = this.storage.getItem('departure');
  }

  ngOnInit(): void {
  }

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
    var cfc : String[] = []; //mang ma chuyen bay da chon
    
    console.log(flightCode + type + price);
    if(this.flight.type) {
      cfc.push(this.cfc);
      this.storage.setItem('cfc', cfc);
      this.router.navigateByUrl('/purchase');
      
    }
    else 
    {
      if(this.departure){
        cfc = this.storage.getItem('cfc');
        cfc.push(this.cfc);
        this.storage.setItem('cfc', cfc);
        this.router.navigateByUrl('/purchase');
      }
      else 
      {
        this.flight_return = {
          origin : this.flight.destination,
          destination : this.flight.origin,
          type : this.flight.type,
          departDate : this.flight.returnDate,
          returnDate : this.flight.departDate,
          quantityPassenger : this.flight.quantityPassenger
        }

        cfc.push(this.cfc);
        this.storage.setItem('cfc', cfc);
        this.storage.setItem('flight', this.flight_return);
        this.storage.setItem('departure', true);
        this.router.navigateByUrl('/flightlist');
        location.reload();
      }
    }
    
  }
  
}

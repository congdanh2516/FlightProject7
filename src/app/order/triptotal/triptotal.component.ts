import { AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';
import { SearchService } from 'src/app/service/search/search.service';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { PassengerinfoComponent } from '../passengerinfo/passengerinfo.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-triptotal',
  templateUrl: './triptotal.component.html',
  styleUrls: ['./triptotal.component.css']
})
export class TriptotalComponent implements OnInit, AfterContentInit, OnChanges {

  type : boolean;
  flight_searched : any;
  cfc : any = [];
  flight : any[] = [];
  fareList : any[] = [];

  flight2 : any[];

  fare : number = 0;
  taxesnfee : number = 0;

  @Input()paymentButton : boolean;


  
  constructor(private storage :LocalstorageService, private search : SearchService, private router : Router, private info : PassengerinfoComponent) { 
    this.initFlightList( () => {
      // console.log("FareLIst")
      // console.log(this.fareList);
    })
  }

  initFlightList(callback : Function){

    this.flight_searched = this.storage.getItem('flight_searched');
    this.type = this.flight_searched.type;

    this.cfc = this.storage.getItem('cfc');

    
    for (var i = 0; i < this.cfc.length; i++)
    {
      this.search.search_by_id(this.cfc[i].flightCode).subscribe(
        data => {
          this.fareList = [];
          this.fare = 0;
          this.taxes = 0;
          this.taxesnfee = 0;
          this.flight.push(data);
          console.log(this.flight.length)
          this.flight.map((item) => {
            item[0].departureTime = new Date(Date.parse(item[0].departureTime));
            item[0].departDate = item[0].departureTime.toDateString();
            item[0].departHour = this.search.formatHour(item[0].departureTime.getHours()) + "h" +
                                  this.search.formatHour(item[0].departureTime.getMinutes()) + "m";
            item[0].arrivedTime = this.search.addHour1(item[0].departureTime.getHours(), item[0].departureTime.getMinutes(), item[0].timeTemp.hour, item[0].timeTemp.minute);
            this.fare = this.fare + item[0].price * this.flight_searched.quantityPassenger;
            this.taxesnfee = this.taxesnfee + item[0].price * item[0].percentage.tax * this.flight_searched.quantityPassenger;
            
            this.fareList.push(item[0].price);
            callback();
          });
        });
        console.log("FareList");
     console.log(this.fareList);
     }
     
  }
 
  ngOnInit(): void { 
    this.ngOnChanges();
  }

  @Input()updateTripTotal : boolean;
  luggages : any[] = [];
  trip1 : number = 0;
  trip2 : number = 0;
  LG010 : number = 0;
  LG023 : number = 0;

  ngOnChanges(): void {
      setTimeout(() => {
        console.log("trip total");
        var services : any[] = [];
        services = this.storage.getItem('services');

        var passengers : any[] = [];
        passengers = this.storage.getItem('passenger');

        this.luggages = [];
        for(let i = 0; i < this.storage.getItem('flight_searched').quantityPassenger; i++) {
          var luggage_passenger : any[] = [];
          var x : number;
          if(this.storage.getItem("flight_searched").type){
            x=1;
          }
          else x=2;

          for(let y = 0; y < x; y++){
            var luggage_trip : any = {
              name : passengers[i].firstName + " " + passengers[i].lastName,
              LG010 : services[i][y].luggage.LG010,
              LG023 : services[i][y].luggage.LG023
            }
            luggage_passenger.push(luggage_trip);
            console.log("passenger");
            console.log(luggage_passenger);
          }
          if(luggage_passenger.length == 1){
            let virtual = {
              name : "",
              LG010 : 0,
              LG023 : 0
            }
            luggage_passenger.push(virtual);
          }
          console.log("luggages")
          this.luggages.push(luggage_passenger);
          console.log(this.luggages);
        }
        this.trip1 = 0;
        this.trip2 = 0;
        this.luggages.map((item : any[]) => {
          this.trip1 += item[0].LG010 + item[0].LG023;
          if(!this.storage.getItem('flight_searched').type){
            this.trip2 += item[1].LG010 + item[1].LG023;
          }
          
        })

        this.LG010 = 0;
        this.LG023 = 0;
        this.luggages.map((item : any[]) => {
          if(!this.storage.getItem('flight_searched').type){
            this.LG010 += item[0].LG010 + item[1].LG010;
            this.LG023 += item[0].LG023 + item[1].LG023;
          }
          else {
            this.LG010 += item[0].LG010;
            this.LG023 += item[0].LG023;
          }
        })

      }, 1000)


  }

  ngAfterContentInit(): void {
  }
  

  labelDetail : boolean = true;
  labelDetailName : string = "Show Detail";

  changeLabel(){
    this.labelDetail=!this.labelDetail;
    if(this.labelDetail){
      this.labelDetailName="Show Detail"
    }
    else this.labelDetailName="Hide Detail"
  }

  //icon
  faCircleInfo = faCircleInfo;

  calculateFare(originalPrice : number, percentClass : number){
    return originalPrice + originalPrice*percentClass;
  }

  calculateTaxes(originalPrice : number, percentTaxes : number, otherFee : number){
    return originalPrice + originalPrice*percentTaxes;
  }

  payment(){
    this.info.nextStep();
    setTimeout(() => {
      console.log("Payment check" + this.info.payment_check)
      if(this.info.payment_check){
        this.router.navigateByUrl("/payment");
      }
  },1000)
    
  }

  //icon
  faPerson = faPerson;
  faBriefcase = faBriefcase;

  taxes : number = 0;
  secureFee : number = 40000;
  domesticServiceFee : number = 200000;
  

  test : boolean = false;

  public total : any;
}

import { DOCUMENT, Time } from '@angular/common';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NEVER } from 'rxjs';
import { AddflightService } from 'src/app/service/addflight/addflight.service';
import { SearchService } from 'src/app/service/search/search.service';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-addflight',
  templateUrl: './addflight.component.html',
  styleUrls: ['./addflight.component.css']
})
export class AddflightComponent implements OnInit {

  airportList : any;
  airportFrom : any;
  airportTo : any;
  minDate : Date;
  constructor(private addflightSV : AddflightService, private search : SearchService) {
    this.minDate = new Date();
    this.search.getAirportList().subscribe(
      data => {
        this.airportList = data.result;
        this.airportFrom = data.result;
        this.airportTo = data.result;
      }
    )

  }

  ngOnInit(): void {

  }

  flightsCode = [
    {code : 'DT101', from : 'Ha Noi', to : 'Sai Gon'},
    {code : 'DT102', from : 'Ha Noi', to : 'Sai Gon'},
    {code : 'DT103', from : 'Ha Noi', to : 'Sai Gon'}
  ]

  aircraft = [
    {
        id : "DTAC01",
        name : "Airbus A321"
    },

    {
      id : "DTAC02",
      name : "Airbus A321"
    },

    {
      id : "DTAC03",
      name : "Airbus A321"
    },

    {
        id : "DTAC06",
        name : "Airbus A320"
    },

    {
        id : "DTAC08",
        name : "Boeing 747"
    },

    {
        id : "DTAC04",
        name : "Airbus A340"
    },

    {
      id : "DTAC011",
      name : "Airbus A340"
    },

    {
        id : "DTAC05",
        name : "Boeing 787-9 Dreamliner"
    },

    {
        id : "DTAC01",
        name : "Boeing 777"
    }
]

  //vo hieu hoa select ma chuyen bay, khi nào người dùng chọn from, to rồi thì select mới đề xuất các mã 
  disableSelect = new FormControl(false);

  //đầu vào
  airCode : string; //ma chuyen bay tu tao DTHANSGN22022022

  departure : string = '';
  destination : string = '';

  startDate : Date;
  timeFlight : string = '';
  departureTime : Date;

  hourDuration : number = 0;
  minuteDuration : number = 0;
  timeTemp : any;

  airName : string = ''; 

  price : number = 0;

  taxes : number;
  business_percent : number;
  percentage : any;

  reset(){
      this.from = "";
      this.to = "";
      this.departure = "";
      this.destination = "";
     // this.startDate = ;
      (<HTMLInputElement>document.getElementById('startDate')).value="";
      this.timeFlight = "";
      this.hourDuration = 0;
      this.minuteDuration = 0;
      this.airName = "";
      this.price = 0;
      //this.taxes = NaN;
  }

  abc(event : any){
    console.log('abc is operating ....');
    console.log(event.value);
  };

  //loai bo vi tri
  exceptLocation(locationcode : any){
      
      
  }

  addFlight(){
    if(this.checkValid()){
      this.startDate.setHours(Number(this.timeFlight.substring(0,2)), Number(this.timeFlight.substring(3,5)));
      this.departureTime=this.startDate;
  
      let month = this.startDate.getMonth()+1;
      var now = new Date();
      this.airCode = "DT" + (Math.floor(Math.random() * 999 + 1)) + "" + now.getSeconds();
  
      console.log(this.airCode);
      
      this.timeTemp = {
        hour : this.hourDuration,
        minute : this.minuteDuration
      }
  
      // this.percentage = {
      //   taxes : this.taxes,
      //   business : this.business_percent,
      // }
  
      const newFlight = {
          airCode : this.airCode,
          departure : this.departure,
          destination : this.destination,
          departureTime : this.departureTime,
          timeTemp : this.timeTemp,
          airName : this.airName,
          price : this.price,
          //percentage : this.percentage
      };
  
      this.addflightSV.addFlight(newFlight).subscribe();
      <any>$('#verify').modal('show')
      this.reset();
      console.log(newFlight);
    }
  }

  exceptAirport(event : any, type : string){
    // this.airportFrom = _.cloneDeep(this.airportList);
    // this.airportTo = _.cloneDeep(this.airportList);
    this.airportTo = [...this.airportList];
    this.airportFrom = [...this.airportList];
    if(type == "from"){
      for(var i = 0; i <  this.airportTo.length; i++){
        if(this.airportTo[i].id == event.value){
          this.airportTo.splice(i,1);
        }
      }
    }

    if(type == "to"){
      for(var i = 0; i <  this.airportFrom.length; i++){
        if(this.airportFrom[i].id == event.value){
          this.airportFrom.splice(i,1);
        }
      }
    }

  }

  from : any = "";
  to : any = "";
  location(event : any, location : string){
    this.search.search_name_airport(event.value).subscribe(
      data => {
        if(location == 'origin')
          this.from = data.result[0].name;
        else this.to = data.result[0].name;
      }
    )
  }

  dateShow : any = "";
  getDate(){
    this.dateShow = this.startDate.toDateString();
  }

  warning : boolean = false;
  checkValid() : boolean {
    var found = true;
    if(this.departure=='' ||
      this.destination=='' ||
      this.startDate== undefined ||
      this.timeFlight == '' ||
      (this.hourDuration == 0 &&
      this.minuteDuration == 0) ||
      this.airName == '' ||
      this.price == 0){
        this.warning=true;
        found = false;
      }
      return found;
  }

  hideError(){
    this.warning=false;
  }

  //icon
  faCircleXmark = faCircleXmark;
  faCircleCheck = faCircleCheck;
  faChevronRight = faChevronRight;
  faCircleExclamation = faCircleExclamation;
}

import { DOCUMENT, Time } from '@angular/common';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NEVER } from 'rxjs';
import { AddflightService } from 'src/app/service/addflight/addflight.service';


@Component({
  selector: 'app-addflight',
  templateUrl: './addflight.component.html',
  styleUrls: ['./addflight.component.css']
})
export class AddflightComponent implements OnInit {

  constructor(private addflightSV : AddflightService) { }

  locationfrom : any;
  locationto : any;

  ngOnInit(): void {

    
    this.addflightSV.getAirportFrom().subscribe(
      data => {
        this.locationfrom = data;
      }
    )

    this.addflightSV.getAirportTo().subscribe(
      data => {
        this.locationto = data;
      }
    )
  }

  flightsCode = [
    {code : 'DT101', from : 'Ha Noi', to : 'Sai Gon'},
    {code : 'DT102', from : 'Ha Noi', to : 'Sai Gon'},
    {code : 'DT103', from : 'Ha Noi', to : 'Sai Gon'}
  ]

  //vo hieu hoa select ma chuyen bay, khi nào người dùng chọn from, to rồi thì select mới đề xuất các mã 
  disableSelect = new FormControl(false);

  //đầu vào
  airCode : string; //ma chuyen bay tu tao DTHANSGN22022022

  departure : string = '';
  destination : string = '';

  startDate : Date;
  timeFlight : string;
  departureTime : Date;

  hourDuration : number;
  minuteDuration : number;
  timeTemp : any;

  airName : string = ''; 

  price : number;

  taxes : number;
  business_percent : number;
  percentage : any;

  reset(){
      this.departure = "";
      this.destination = "";
     // this.startDate = ;
      (<HTMLInputElement>document.getElementById('startDate')).value="";
      this.timeFlight = "";
      this.hourDuration = NaN;
      this.minuteDuration = NaN;
      this.airName = "";
      this.price = NaN;
      this.taxes = NaN;
  }

  abc(event : any){
    console.log('abc is operating ....');
    console.log(event.value);
  };

  //loai bo vi tri
  exceptLocation(locationcode : any){
      // console.log(this.locationto);
      // for(var i=0; i<this.locationto.length; i++){
      //   if (this.locationto[i].id == locationcode){
      //     this.locationto.splice(i,1);
      //   }
      // }
      // console.log(this.locationto);

      // this.startDate.setHours(Number(this.timeFlight.substring(0,2)), Number(this.timeFlight.substring(3,5)));
      // //console.log(this.timeFlight);
      // console.log(this.startDate);

    

      // console.log(this.timeTemp);
      
  }

  addFlight(){
    this.startDate.setHours(Number(this.timeFlight.substring(0,2)), Number(this.timeFlight.substring(3,5)));
    this.departureTime=this.startDate;

    let month = this.startDate.getMonth()+1;
    this.airCode="DT"+this.departure+this.destination+this.departureTime.getDate()+
                month+this.departureTime.getFullYear().toString().substring(2)+
                this.timeFlight.substring(0,2)+this.timeFlight.substring(3,5);

    console.log(this.airCode);
    
    this.timeTemp = {
      hour : this.hourDuration,
      minute : this.minuteDuration
    }

    this.percentage = {
      taxes : this.taxes,
      business : this.business_percent,
    }

    const newFlight = {
        airCode : this.airCode,
        departure : this.departure,
        destination : this.destination,
        departureTime : this.departureTime,
        timeTemp : this.timeTemp,
        airName : this.airName,
        price : this.price,
        percentage : this.percentage
    }

    this.addflightSV.addFlight(newFlight).subscribe();
    console.log(newFlight);
  }

}

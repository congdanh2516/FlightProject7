import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-addflight',
  templateUrl: './addflight.component.html',
  styleUrls: ['./addflight.component.css']
})
export class AddflightComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  location = [
    {value : 'HAN', viewValue : 'Hà Nội'},
    {value : 'SGN', viewValue : 'TP Hồ Chi Minh'}
  ];

  flightsCode = [
    {code : 'DT101', from : 'Ha Noi', to : 'Sai Gon'},
    {code : 'DT102', from : 'Ha Noi', to : 'Sai Gon'},
    {code : 'DT103', from : 'Ha Noi', to : 'Sai Gon'}
  ]

  //vo hieu hoa select ma chuyen bay, khi nào người dùng chọn from, to rồi thì select mới đề xuất các mã 
  disableSelect = new FormControl(false);

  //đầu vào
  from : string = '';
  to : string = '';
  flightCode : string = '';
  startDate : string = '';
  timeFlight : string = '';
  hourDuration : number;
  minuteDuration : number;
  plane : string = ''; 
  priceTicket : number;

  reset(){
    this.from = '';
    this.to = '';
    this.flightCode = '';
    this.startDate = '';
    this.timeFlight = '';
    this.hourDuration = NaN;
    this.minuteDuration = NaN;
    this.plane = '';
    this.priceTicket = NaN;
  }

  abc(event : any){
    console.log('abc is operating ....');
    console.log(event.value);
  };

}

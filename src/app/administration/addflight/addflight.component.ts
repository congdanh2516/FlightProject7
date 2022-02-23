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

  disableSelect = new FormControl(false);

  abc(event : any){
    console.log('abc is operating ....');
    console.log(event.value);
  };

}

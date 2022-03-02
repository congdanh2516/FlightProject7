import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-headerinfo',
  templateUrl: './headerinfo.component.html',
  styleUrls: ['./headerinfo.component.css']
})
export class HeaderinfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  location = [
    {value : 'HAN', viewValue : 'Hà Nội'},
    {value : 'SGN', viewValue : 'TP Hồ Chi Minh'}
  ];

  selectedFrom : string = 'SGN';

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

}

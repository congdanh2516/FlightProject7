import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-airplanecard',
  templateUrl: './airplanecard.component.html',
  styleUrls: ['./airplanecard.component.css']
})
export class AirplanecardComponent implements OnInit {

  @Input()image : string;
  @Input()text : string;
  constructor() { }

  ngOnInit(): void {
  }

}

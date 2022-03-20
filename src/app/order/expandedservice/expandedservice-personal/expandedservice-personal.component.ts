import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-expandedservice-personal',
  templateUrl: './expandedservice-personal.component.html',
  styleUrls: ['./expandedservice-personal.component.css']
})
export class ExpandedservicePersonalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()firstName : string;
  @Input()lastName : string;
  @Input()no : number;

  meal = [
    {id : 'ML001', name : "Vegetarian Meal"},
    {id : 'ML002', name : 'Halal Meal'},
    {id : 'ML003', name : 'Fruit Meal'}
  ]
}

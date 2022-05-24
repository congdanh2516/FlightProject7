import { Component, Input, OnInit } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()departDate : string;

  //icon
  faCalendar = faCalendar;
}

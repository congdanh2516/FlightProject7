import { Component, OnInit } from '@angular/core';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.css']
})
export class IntroduceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //icon
  faLocationDot = faLocationDot;

}

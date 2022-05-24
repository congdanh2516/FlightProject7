import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-howtobook',
  templateUrl: './howtobook.component.html',
  styleUrls: ['./howtobook.component.css']
})
export class HowtobookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //icon
  faMagnifyingGlass = faMagnifyingGlass;

}

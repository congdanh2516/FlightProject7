import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-searchnbook',
  templateUrl: './searchnbook.component.html',
  styleUrls: ['./searchnbook.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchnbookComponent implements OnInit {

  constructor() { }
  selectedIndex=0;


  ngOnInit(): void {
  }
  

}

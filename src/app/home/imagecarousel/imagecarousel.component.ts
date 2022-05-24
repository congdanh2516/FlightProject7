import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imagecarousel',
  templateUrl: './imagecarousel.component.html',
  styleUrls: ['./imagecarousel.component.css']
})
export class ImagecarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cellWidth : number = 350;
}

import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../service/localstorage/localstorage.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private storage : LocalstorageService) {
    this.storage.removeItem('contact');
    this.storage.removeItem('passenger');
  }

  ngOnInit(): void {
  }

}

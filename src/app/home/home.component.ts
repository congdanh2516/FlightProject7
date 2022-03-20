import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../service/localstorage/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private storage : LocalstorageService) {
    this.storage.setItem('departure' , false);
    this.storage.removeItem('cfc');
   }

  ngOnInit(): void {
    
  }

}
import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../service/localstorage/localstorage.service';
import { SharingdataService } from '../service/sharingdata/sharingdata.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private storage : LocalstorageService, private data : SharingdataService) {
    this.storage.setItem('departure' , false);
    this.storage.removeItem('cfc');
   }

  message:boolean;
  subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message)
    console.log(this.message);
  }

  blur : boolean = false;

  changeBlur(){
    this.message=false;
  }

}
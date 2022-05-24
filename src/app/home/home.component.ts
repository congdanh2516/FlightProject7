var userinfo = {
  name : "Cao Cong Danh",
  age : 22,
  height : 1.7,
  happy : true,
  unknow : null
}
localStorage.setItem('userinfo', JSON.stringify(userinfo));





import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../service/localstorage/localstorage.service';
import { SharingdataService } from '../service/sharingdata/sharingdata.service';
import { Subscription } from 'rxjs';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faStairs } from '@fortawesome/free-solid-svg-icons';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private storage : LocalstorageService, private data : SharingdataService) {



    this.storage.setItem('departure' , false);
    this.storage.removeItem('cfc');
    this.storage.removeItem('passenger');
    this.storage.removeItem('status');
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


  //icon
  faLocationDot = faLocationDot;
  faGlobe = faGlobe;
  faStairs = faStairs;
  faPlane = faPlane;
  faMagnifyingGlass = faMagnifyingGlass;
}
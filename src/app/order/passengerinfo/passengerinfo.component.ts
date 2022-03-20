import { Component, OnInit } from '@angular/core';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';

@Component({
  selector: 'app-passengerinfo',
  templateUrl: './passengerinfo.component.html',
  styleUrls: ['./passengerinfo.component.css']
})
export class PassengerinfoComponent implements OnInit {

  flight_searched : any;
  quantityPassenger : number[] = [];
  constructor(private storage : LocalstorageService) { 
    //this.storage.removeItem('passenger');
    this.flight_searched = this.storage.getItem('flight_searched');
    for(var i=0; i<this.flight_searched.quantityPassenger; i++){
      this.quantityPassenger.push(i);
    }
  }

  ngOnInit(): void {
  }

  //var
  suffix : boolean;
  firstName : string;
  lastName : string;
  dateofBirth : Date;
  identification : string;
  phone: string;
  email : string;

  //icon
  faCircleInfo = faCircleInfo;

  //select
  suffixSelect = [
    {value : 1, view : "Mr"},
    {value : 0, view : "Ms"}
  ]

  appear : boolean = false;
  nextStepTitle : string = "Next Step"

  nextStep(){
    //kiem tra cac truong da duoc nhap day du chua

    this.appear=!this.appear;
    if (!this.appear) {
      this.nextStepTitle = "Next Step";
    }
    else this.nextStepTitle = "Back to Info";

    var contact = {
      suffix : this.suffix,
      firstName : this.firstName,
      lastName : this.lastName,
      dateofBirth : this.dateofBirth,
      identification : this.identification,
      email : this.email,
      phone : this.phone
    }

    this.storage.setItem('contact', contact);
  }

  panelOpenState = false;

  contactInfo : any;
  onGetContactInfo(value : any, i : number){
    if(i==0){
      this.contactInfo = value;
      console.log(this.contactInfo);
      
      this.firstName = this.contactInfo.firstName;
      this.lastName = this.contactInfo.lastName;
      this.suffix = this.contactInfo.suffix;
      this.identification = this.contactInfo.identification;
      this.dateofBirth = this.contactInfo.dateofBirth;
    }
  }


}

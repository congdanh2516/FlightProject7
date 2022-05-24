import { Component, OnInit } from '@angular/core';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faLess } from '@fortawesome/free-brands-svg-icons';
import { Injectable } from '@angular/core'; // at top
import { OrderService } from 'src/app/service/order/order.service';
import { LoginService } from 'src/app/service/login/login.service';
import { AuthGuardService } from 'src/app/service/guard/auth-guard.service';

@Injectable({
  providedIn: 'root' // just before your class
})

@Component({
  selector: 'app-passengerinfo',
  templateUrl: './passengerinfo.component.html',
  styleUrls: ['./passengerinfo.component.css']
})
export class PassengerinfoComponent implements OnInit {

  hide : boolean = false;

  flight_searched : any;
  quantityPassenger : number[] = [];
  constructor(private storage : LocalstorageService, private order : OrderService, private login : LoginService, private guar : AuthGuardService) { 
    //this.storage.removeItem('passenger');
    this.flight_searched = this.storage.getItem('flight_searched');
    for(var i=0; i<this.flight_searched.quantityPassenger; i++){
      this.quantityPassenger.push(i);
    }

    //  let passengers : any[] = [];
    //   let passenger1 = {
    //     suffix : this.suffix,
    //     firstName : this.firstName,
    //     lastName : this.lastName,
    //     dateofBirth : this.dateofBirth,
    //     identification : this.identification
    //   }
    //   for(let i = 0; i < this.storage.getItem('flight_searched').quantityPassenger; i++){
    //     passengers.push(passenger1);
    //   }
      
    //   this.storage.setItem('passenger', passengers);
    // //this.storage.removeItem('passenger');

  }

  private infoLogin : any = {};
  ngOnInit(): void {

    if(this.login.loggedIn()){
      this.login.getProfile().subscribe(
        data => {
          console.log(data)
          this.infoLogin = data.user;
          this.suffix = this.infoLogin.userName.suffix,
          this.firstName = this.infoLogin.userName.firstName,
          this.lastName = this.infoLogin.userName.lastName,
          data.dateOfBirth = new Date(Date.parse(this.infoLogin.dateOfBirth)),
          //this.dateofBirth = new Date(data.dateOfBirth.getDate(), data.dateOfBirth.getMonth(), data.dateOfBirth.getFullYear())
          //this.dateofBirth = new Date();
          // this.dateofBirth.setDate(data.dateOfBirth.getDate()),
          // this.dateofBirth.setMonth(data.dateOfBirth.getMonth()),
          // this.dateofBirth.setFullYear(data.dateOfBirth.getFullYear()),
          // console.log(this.dateofBirth)
          //this.dateofBirth = this.infoLogin.dateOfBirth,

          this.dateBirth = data.dateOfBirth.getDate();
          this.monthBirth = data.dateOfBirth.getMonth();
          this.yearBirth = data.dateOfBirth.getFullYear();
          this.identification = this.infoLogin.identificationCard;
          this.phone = this.infoLogin.userPhoneNumber;
          this.email = this.infoLogin.userEmail;
        }
      )
    }

    if(this.storage.getItem('contact')){
      var contact = this.storage.getItem('contact');
      this.suffix = contact.suffix;
      this.firstName = contact.firstName;
      this.lastName = contact.lastName;

      this.dateofBirth = contact.dateofBirth;
      var dateofBirth = new Date(Date.parse(contact.dateofBirth));
      this.dateBirth = dateofBirth.getDate();
      this.monthBirth = dateofBirth.getMonth()+1;
      this.yearBirth = dateofBirth.getFullYear();
    }

    var services : any[] = [];
      var service_passenger : any[] = [];
      var service_trip : any = {
        luggage : {
          LG010 : 0,
          LG023 : 0
        },
        meal : "",
        health : false,
        crip : false
      };

      for(let i = 0 ; i < this.storage.getItem('flight_searched').quantityPassenger; i++){
        service_passenger = [];
        if(this.storage.getItem('flight_searched').type){
          service_passenger.push(service_trip);
        }
        else {
          service_passenger.push(service_trip);
          service_passenger.push(service_trip);
        }
        console.log(i);
        console.log(service_passenger);
        services.push(service_passenger);
      }

      this.storage.setItem('services', services);
  }
  

  //var
  suffix : string = "";
  firstName : string = "";
  lastName : string = "";
  dateofBirth : string = '';
  dateBirth : number;
  monthBirth : number;
  yearBirth : number
  identification : string = "";
  phone: string = "";
  email : string = "";

  monthList = [
    {value : 1, view : 'January'},
    {value : 2, view : 'February'},
    {value : 3, view : 'March'},
    {value : 4, view : 'April'},
    {value : 5, view : 'May'},
    {value : 6, view : 'June'},
    {value : 7, view : 'July'},
    {value : 8, view : 'August'},
    {value : 9, view : 'Septemper'},
    {value : 10, view : 'October'},
    {value : 11, view : 'Novenber'},
    {value : 12, view : 'December'}
  ]

  //icon
  faCircleInfo = faCircleInfo;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faCircleExclamation = faCircleExclamation;

  //select
  suffixSelect = [
    {value : 1, view : "Mr"},
    {value : 0, view : "Ms"}
  ]

  appear : boolean = false;
  icon : string
  nextStepTitle : string = "Continue, choose luggage and others services  "

  public payment_check : boolean = false;

  nextStep(){
      this.payment_check = false;
      this.appear=!this.appear;
      this.valid=true;

      this.dateofBirth = this.yearBirth + "-" + this.monthBirth + "-" + this.dateBirth;
      
      setTimeout(() => {
        console.log("Valid " + this.valid)
        if(!this.checkValid()){
          this.checkValid_var = true;
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
        else {
          this.checkValid_var=false;
          this.error_popup = true;
        }
  
        
        console.log("CheckValid" + this.checkValid_var)
        if(this.checkValid_var == true && this.valid == true){ //thong tin hop le
          this.hide = true; //cho an
          this.payment_check = true;
        }
        else {
          this.hide = false; //khong cho can
        }
        console.log("Hide" + this.hide)
        this.valid=true;
      },500)

  }

  panelOpenState = false;

  contactInfo : any;
  onGetContactInfo(value : any, i : number){
    this.onChange();
    if(i==0){
      this.contactInfo = value;
      console.log(this.contactInfo);
      
      this.firstName = this.contactInfo.firstName;
      this.lastName = this.contactInfo.lastName;
      this.suffix = this.contactInfo.suffix;
      this.identification = this.contactInfo.identification;
      // this.dateofBirth = this.contactInfo.dateofBirth;
      this.dateBirth = this.contactInfo.dateBirth,
      this.monthBirth = this.contactInfo.monthBirth,
      this.yearBirth = this.contactInfo.yearBirth
    }
    this.checkValidDate();
  }

  validDate(value : any){
    //this.unvalidDate = value;
  }


  checkValid_var : boolean = false;
  error_amount : number = 0;
  error_popup : boolean = false;
  notice : string = "";
  checkValid() : boolean {
    var found : boolean = false;
    this.error_amount = 0;
    this.notice="";
    if(this.suffix == ''){
      found = true;
      this.notice = "Suffix, ";
      this.error_amount ++;
    }

    if(this.firstName == ""){
      found = true;
      this.notice += "First name, "
      this.error_amount ++;
    }

    if(this.lastName == ""){
      found = true;
      this.notice += "Last name, ";
      this.error_amount ++;
    }

    if(this.dateofBirth == undefined){
      found = true;
      this.notice += "Date of birth, ";
      this.error_amount ++;
    }

    if(this.identification == "") {
      found = true;
      this.notice += "Identification Card No, ";
      this.error_amount ++;
    }

    this.checkValidDate();
    if(this.unvalidDate || this.dateBirth === undefined || this.monthBirth === undefined || this.yearBirth === undefined){
      found = true;
      this.notice += "Date of Birth, "
      this.error_amount++;
    }

    if(this.phone == ""){
      found=true;
      this.notice += "Phone, ";
      this.error_amount++;
    }

    if(this.email == ""){
      found=true;
      this.notice += "Email, ";
      this.error_amount ++;
    }

    this.notice = this.notice.substring(0, this.notice.length-2); //cat bo dau phay cuoi
    if(this.error_amount==1){
      this.notice += " is incorrect";
    }
    else if (this.error_amount > 1) {
      this.notice += " are incorrect";
    }
    

    return found;
  }

  updateTripTotal_var : boolean;
  updateTripTotal(event : any){
    this.updateTripTotal_var = event;
  }

  valid : boolean = true;
  checkValidFromChild(value : any){
    this.valid=value;
  }

  show(){
    this.hide=false;
  }

  onChange(){
    this.error_popup=false;
  }

  unvalidDate = false;

  checkValidDate(){
    this.unvalidDate = false;
    
    if(this.dateBirth !== undefined && this.monthBirth !== undefined && this.yearBirth !== undefined){
      console.log("Khac undefined")
      if(isNaN(this.dateBirth) || isNaN(this.yearBirth)){
        console.log("La chu")
        this.unvalidDate = true;
      }
      else {
        if(!this.order.checkValiDate(Number(this.dateBirth), Number(this.monthBirth), Number(this.yearBirth))){
          this.unvalidDate = true;
        }
      }
    }
  }
}

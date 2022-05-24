import { Component, Input, OnInit, OnDestroy, OnChanges, Output, EventEmitter } from '@angular/core';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/service/login/login.service';
import { AuthGuardService } from 'src/app/service/guard/auth-guard.service';
import { OrderService } from 'src/app/service/order/order.service';

@Component({
  selector: 'app-passenger-personal',
  templateUrl: './passenger-personal.component.html',
  styleUrls: ['./passenger-personal.component.css']
})
export class PassengerPersonalComponent implements OnInit, OnDestroy, OnChanges {

  @Input()appear : boolean;
  @Input()no : number;
  @Input()hide : boolean;

  @Output('contactinfo')
  onHandleContactinfo = new EventEmitter<any>();

  @Output('valid')
  onHandleValid = new EventEmitter<any>();

  @Output('validDate')
  onHandleValidDate = new EventEmitter<any>();

  public contactinfo : any;


  constructor(private storage : LocalstorageService, private login : LoginService, private guar : AuthGuardService, private order : OrderService) { }

  private infoLogin : any = {};
  ngOnInit(): void {
    
    if(this.login.loggedIn() && this.no == 0){
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
          this.identification = this.infoLogin.identificationCard
        }
      )
    }
    else {
      if(this.storage.getItem('passenger')){
        var passenger = this.storage.getItem('passenger');
        this.suffix = passenger[this.no].suffix;
        this.firstName = passenger[this.no].firstName;
        this.lastName = passenger[this.no].lastName;
        if(passenger[this.no].dateofBirth != ''){
          var dateofBirth = new Date(Date.parse(passenger[this.no].dateofBirth));
          this.dateBirth = dateofBirth.getDate();
          this.monthBirth = dateofBirth.getMonth()+1;
          this.yearBirth = dateofBirth.getFullYear();
        }
        
      }
    }
    //this.onChange();
  }

  ngOnDestroy() {
    
  }

  onChange(){
    this.error_popup=false;
    this.contactinfo = {
      suffix : this.suffix,
      firstName : this.firstName,
      lastName : this.lastName,
      //dateofBirth : this.dateofBirth,
      dateBirth : this.dateBirth,
      monthBirth : this.monthBirth,
      yearBirth : this.yearBirth,
      identification : this.identification,
    }
    this.onHandleContactinfo.emit(this.contactinfo);
  }

  firstTime : boolean = true;
  ngOnChanges() {

     // this.error_popup = false;

      if(!this.firstTime){ //bat dau tu lan 2

      //  if(this.appear){ //neu appear = true thi moi check, nguoc lai se hien thi lai thong tin nhap

          if(!this.checkValid()){ //neu thong tin hop le
            this.dateofBirth = this.yearBirth + "-" + this.monthBirth + "-" + this.dateBirth;
            this.checkValid_var=true;
            if(!this.storage.getItem('passenger')){
              let passengers : any[] = [];
              let passenger1 = {
                suffix : this.suffix,
                firstName : this.firstName,
                lastName : this.lastName,
                dateofBirth : this.dateofBirth,
                identification : this.identification
              }
              
              passengers[this.no] = passenger1;
              this.storage.setItem('passenger', passengers);
            }
            else 
            {
                let passenger1 = {
                  suffix : this.suffix,
                  firstName : this.firstName,
                  lastName : this.lastName,
                  dateofBirth : this.dateofBirth,
                  identification : this.identification
                }
                let passengers : any[] = [];
                passengers = this .storage.getItem('passenger');
                passengers[this.no] = passenger1;
                this.storage.setItem('passenger', passengers);
            }

          }
          else{ //thong tin khong hop le
            this.checkValid_var=false;
            this.error_popup=true;
          }
        
        // }
        // else { //appear == false , mo lai form nhap
        //   this.checkValid_var=false;
        // }
      }
      else{
        if(!this.storage.getItem('passenger')){
 
          let passengers : any[] = [];
          let passenger1 = {
            suffix : this.suffix,
            firstName : this.firstName,
            lastName : this.lastName,
            dateofBirth : this.dateofBirth,
            identification : this.identification
          }
          // for(let i = 0; i < this.storage.getItem('flight_searched').quantityPassenger; i++){
            
          // }
          passengers[this.no] = passenger1;
          this.storage.setItem('passenger', passengers);
        }
      }

      this.firstTime = false;

      if(this.checkValid_var == false){
        console.log("checkValid" + this.checkValid_var)
        this.onHandleValid.emit(this.checkValid_var);
      }
  }

  suffix : string = '';
  firstName : string = '';
  lastName : string = '';
  dateofBirth : string = '';
  dateBirth : number;
  monthBirth : number;
  yearBirth : number;
  identification : string = '';

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
  faCircleExclamation = faCircleExclamation;



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

    this.notice = this.notice.substring(0, this.notice.length-2); //cat bo dau phay cuoi
    if(this.error_amount==1){
      this.notice += " is incorrect";
    }
    else if (this.error_amount > 1) {
      this.notice += " are incorrect";
    }
    

    return found;
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

    this.onHandleValidDate.emit(this.unvalidDate);
  }
}

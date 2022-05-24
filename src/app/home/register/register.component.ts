import { Component, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RegisterService } from 'src/app/service/register/register.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  login_var : number = 1;
  @Output("login")
  onHandelLogin = new EventEmitter<number>();

  hide : boolean = true;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = true;

  suffixList = [
    {value: 0, viewValue: 'Ms'},
    {value: 1, viewValue: 'Mr'}
  ];

  constructor(private _formBuilder: FormBuilder, private registerService : RegisterService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  //var
  suffix : string;
  identificationCard : string;
  userPassword : string;
  userEmail : string;
  userPhoneNumber : string;
  dateOfBirth : Date;
  lastName : string;
  firstName : string;
  

  register (){
    var userInfo = {
        suffix : this.suffix,
        firstName : this.firstName,
        lastName : this.lastName
    }
    const newUser = {
      identificationCard : this.identificationCard,
      userPassword : this.userPassword,
      userEmail : this.userEmail,
      userPhoneNumber : this.userPhoneNumber,
      dateOfBirth : this.dateOfBirth,
      userName : userInfo
    }
    console.log(newUser);
    return this.registerService.register_sv(newUser).subscribe(
      data => {
        if(data.success){
          alert("Sign up successfully");
          this.suffix='';
          this.identificationCard=''
          this.userPassword='';
          this.lastName='';
          this.firstName='';
          this.userPhoneNumber='';
          this.userEmail='';
          (<HTMLInputElement>document.getElementById('dateOfBirth_2')).value="";
          this.login_var = 0;
          this.onHandelLogin.emit(this.login_var);
        }
        else {
          alert(data.message);
        }
      }
    );
  }


  
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RegisterService } from 'src/app/service/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
    return this.registerService.register_sv(newUser).subscribe();
  }


  
}

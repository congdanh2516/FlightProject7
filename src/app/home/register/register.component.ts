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

  suffix = [
    {value: 0, viewValue: 'Bà'},
    {value: 1, viewValue: 'Ông'}
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

  newUser : any = {
    suffix : '',
    firstName : '',
    lastName : '',
    dateOfBirth : '',
    email : '',
    phoneNumber : '' 
  }

  register (newUser : any){
    return this.registerService.register_sv(newUser).subscribe();
  }


  
}

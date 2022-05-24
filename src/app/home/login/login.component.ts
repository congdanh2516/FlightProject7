import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private logginService : LoginService, 
    private router : Router,
    private dialogRef : MatDialog,
    private storage : LocalstorageService
  ) { }

  ngOnInit(): void {
  }

  hide : boolean = true;

  username : string = "";
  password : string = "";

  //icon
  faCircleExclamation = faCircleExclamation;

  //notice
  notice : string = '';
  empty : boolean = true;

  warning : boolean = false;
  login(){

      this.onBlur();

      if(this.warning == false){
        const user = {
          identificationCard : this.username,
          userPassword : this.password
        }
        this.logginService.login_sv(user).subscribe(
          data => {
            console.log("Data")
            console.log(data);
            if(data.success){
              this.logginService.storeUserData(data.accessToken);
              this.logginService.getProfile().subscribe(
                profile => {
                  console.log("profile");
                  console.log(profile)
                }
              )
  
              this.dialogRef.closeAll();
              this.storage.setItem('role', data.role);
              if(data.role == "admin")
              {
                this.router.navigateByUrl('/admin');
              }
              else {
                window.location.reload();
              }

            }
            else {
              console.log("data: " + data.success)
              this.warning = true;
              this.notice = "Identification Card No or Password is incorrect"
            }
          });
      }
  }


  onBlur(){
    var found = false;
   
    if(this.username == ""){
      found=true;
      this.notice = "Identification Card No is empty"
    }

    if(this.password == ""){
      found=true;
      this.notice = "Password is empty"
    }

    if(this.password == "" && this.username == ""){
      found=true;
      this.notice = "Identification Card No and Password are empty"
    }

    this.warning=found;
    console.log(this.warning);
  }

  onKeyUp(){
    this.warning = false;
  }
}

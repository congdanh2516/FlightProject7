import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService : LoginService, 
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  hide : boolean = true;

  username : string;
  password : string;

  //notice
  notice : string = '';
  empty : boolean = true;

  login(){
      // if(this.account.username == undefined || this.account.password == undefined){
      //     this.notice="Vui long nhap ten dang nhap va mat khau";
      // }
      // else {
      //   this.empty=false;
      // }
      console.log(this.username + this.password);
      const user = {
        username : this.username,
        password : this.password
      }
      console.log(user);
      this.loginService.login_sv(user).subscribe(
        data => {
          console.log(data);
        });
  }
}

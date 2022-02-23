import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
  }

  hide : boolean = true;

  account = {
    username : '',
    password : ''
  }

  //notice
  notice : string = '';
  empty : boolean = true;

  login(){
      if(this.account.username == undefined || this.account.password == undefined){
          this.notice="Vui long nhap ten dang nhap va mat khau";
      }
      else {
        this.empty=false;
      }
      console.log(this.account.username + this.account.password);
      this.loginService.login_sv(this.account).subscribe();
  }
}

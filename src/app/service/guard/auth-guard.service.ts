import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router : Router, private loggin : LoginService, private storage : LocalstorageService) { }

  canActivate(next : ActivatedRouteSnapshot, state : RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean{
    if(this.loggin.loggedIn() && this.storage.getItem('role') == 'admin'){
      return true;
    }
    else {
      this.router.navigateByUrl('/home');
      return false;
    }
  }

  canActivate_2(){
    if(this.loggin.loggedIn()){
      return true;
    }
    else {
      return false;
    }
  }
}

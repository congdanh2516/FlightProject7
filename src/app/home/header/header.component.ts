import { Component, OnInit } from '@angular/core';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { DialoginterfaceComponent } from '../dialoginterface/dialoginterface.component';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/service/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name : any = '';

  constructor(public dialog: MatDialog, public loggin : LoginService, private router : Router) {
    console.log("Loggedin " + this.loggin.loggedIn());
    if(this.loggin.loggedIn()){
      this.loggin.getProfile().subscribe(
        profile => {
          console.log("pr");
          console.log(profile)
          this.name = profile.user.userName.firstName + " " + profile.user.userName.lastName;
        });
    }
  }

  ngOnInit(): void {
  }

  //icon
  faGlobe = faGlobe;

  faCircleUser = faCircleUser;

  openDialog() {
    const dialogRef = this.dialog.open(DialoginterfaceComponent);
    // , {
    //   width: '700px',
    //   height: '640px',
    // });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout(){
    this.loggin.logout();
  }

  accessAdmin(){
    // this.loggin.getRole().subscribe(
    //   data => {
    //     console.log("Role")
    //     console.log(data);
    //     if(data.role == 'admin'){
    //       this.router.navigateByUrl('/admin')
    //     }
    //     else {
    //       this.router.navigateByUrl('/home');
    //     }
    //   });
    this.router.navigateByUrl('/admin')
  }
}

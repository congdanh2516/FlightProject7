import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddflightComponent } from './addflight/addflight.component';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

import { LoginService } from '../service/login/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  constructor(public dialog: MatDialog, private login : LoginService, private router : Router) { 
    // this.login.getRole().subscribe(
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

    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }

  ngOnInit(): void {
    
  }


  //icon
  faMagnifyingGlass = faMagnifyingGlass;
  faCirclePlus = faCirclePlus;
  faGlobe = faGlobe;

  openDialogAddNew() {
    const dialogRef = this.dialog.open(AddflightComponent, {
      width: '1000px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openDialogFlightStatus() {
    const dialogRef = this.dialog.open(AddflightComponent, {
      width: '1000px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public flightCode : string = "";
  searchFlight(){
    if(this.flightCode != ""){
      console.log(this.flightCode);
      this.router.navigateByUrl(`/admin/detail/${this.flightCode}`)
    }
  }

  blur : boolean = false;

  createFlight(){
    this.router.navigateByUrl('/admin/create');
  }
}

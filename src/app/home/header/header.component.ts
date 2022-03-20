import { Component, OnInit } from '@angular/core';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { DialoginterfaceComponent } from '../dialoginterface/dialoginterface.component';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

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
}

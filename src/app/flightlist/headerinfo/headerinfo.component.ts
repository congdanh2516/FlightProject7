import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { SearchComponent } from 'src/app/home/search/search.component';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';

@Component({
  selector: 'app-headerinfo',
  templateUrl: './headerinfo.component.html',
  styleUrls: ['./headerinfo.component.css'],
  
})
export class HeaderinfoComponent implements OnInit {

  flight : any;
  constructor(private storage : LocalstorageService, public dialog : MatDialog) { 
    this.flight = this.storage.getItem('flight_searched');
    this.flight.departDate = new Date (Date.parse(this.flight.departDate));
    this.flight.returnDate = new Date (Date.parse(this.flight.returnDate));
    this.flight.quantityPassenger = Number(this.flight.quantityPassenger);


  }

  
  ngOnInit(): void {
    
  }

  // @Input()originCode : string;
  // @Input()destinationCode : string;
    @Input()origin : string = "";
    @Input()destination : string = "";
    @Input()type : boolean;
    @Input()departDate : Date;
    @Input()returnDate : Date;
  // @Input()quantityPassenger : number;


  location = [
    {value : 'HAN', viewValue : 'Hà Nội'},
    {value : 'SGN', viewValue : 'TP Hồ Chi Minh'}
  ];

  selectedFrom : string = 'SGN';

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });


  //icon
  faPlane = faPlane;

  openDialogSearch() {
    const dialogRef = this.dialog.open(SearchComponent, {
      width: '1400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  
}

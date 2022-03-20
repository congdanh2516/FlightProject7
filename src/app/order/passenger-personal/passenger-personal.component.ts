import { Component, Input, OnInit, OnDestroy, OnChanges, Output, EventEmitter } from '@angular/core';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';

@Component({
  selector: 'app-passenger-personal',
  templateUrl: './passenger-personal.component.html',
  styleUrls: ['./passenger-personal.component.css']
})
export class PassengerPersonalComponent implements OnInit, OnDestroy, OnChanges {

  @Input()appear : boolean;

  @Output('contactinfo')
  onHandleContactinfo = new EventEmitter<any>();

  public contactinfo : any;

  constructor(private storage : LocalstorageService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {

  }

  onChange(){
    this.contactinfo = {
      suffix : this.suffix,
      firstName : this.firstName,
      lastName : this.lastName,
      dateofBirth : this.dateofBirth,
      identification : this.identification
    }
    this.onHandleContactinfo.emit(this.contactinfo);
  }

  ngOnChanges() {
    


    if(this.appear){
      if(!this.storage.getItem('passenger')){
        var passenger1 = {
          suffix : this.suffix,
          firstName : this.firstName,
          lastName : this.lastName,
          dateofBirth : this.dateofBirth,
          identification : this.identification
        }
        let passenger : any[] = [];
        passenger.push(passenger1);
        this.storage.setItem('passenger', passenger);
      }
      else 
      {
        if (this.storage.getItem('passenger').length < this.storage.getItem('flight_searched').quantityPassenger){
          var passenger : any[] = [];
          var passenger_local = this.storage.getItem('passenger');
          for(var i=0; i<this.storage.getItem('passenger').length; i++)
          {
            passenger.push(passenger_local[i]);
          }
          const passenger1 = {
            suffix : this.suffix,
            firstName : this.firstName,
            lastName : this.lastName,
            dateofBirth : this.dateofBirth,
            identification : this.identification
          }
          passenger.push(passenger1);
          this.storage.setItem('passenger', passenger);
        }
      }
    }
    
  }

  suffix : string;
  firstName : string;
  lastName : string;
  dateofBirth : Date;
  identification : string;

  //icon
  faCircleInfo = faCircleInfo;

}

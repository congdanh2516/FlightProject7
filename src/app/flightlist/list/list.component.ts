import { Component, OnInit } from '@angular/core';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { throwError } from 'rxjs';
import { AddflightService } from 'src/app/service/addflight/addflight.service';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';
import { SearchService } from 'src/app/service/search/search.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private search : SearchService, private storage : LocalstorageService) { 
    console.log("constructure");
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    
  }

  flights : any[];
  flight : any;
  flight_searched : any;

  returnDate : any;
  departDate : any;
  flightOriginName : string;
  flightDestinationName : string;

  originLocation : any;
  destinationLocation : any;
  

  ngOnInit(): void {
    
    this.flight = this.storage.getItem('flight');
    this.flight_searched = this.storage.getItem('flight_searched');
    this.search.search_sv(this.flight).subscribe(
      data => {this.flights = data 
        console.log(this.flights)
        console.log(Date.parse(this.flights[0].departureTime))
        this.flights.map((item) => {
          item.departTime = new Date (Date.parse(item.departureTime));
          item.departHour = this.formatHour(item.departTime.getHours()) + ":" + this.formatHour(item.departTime.getMinutes());
          item.departHour1 = this.formatHour(item.departTime.getHours()) + "h" + this.formatHour(item.departTime.getMinutes()) + "m";
          item.departDate = item.departTime.toDateString();
          item.arrivedTime = this.search.addHour(item.departTime.getHours(), item.departTime.getMinutes(), item.timeTemp.hour, item.timeTemp.minute);
        });

        //error
        this.search.search_name_airport(this.flight_searched.origin).subscribe(
          data => {
            this.originLocation = data;
            this.flightOriginName = this.originLocation.name.toUpperCase();
          }
        );

        this.search.search_name_airport(this.flight_searched.destination).subscribe(
          data => {
            this.destinationLocation = data;
            this.flightDestinationName = this.destinationLocation.name.toUpperCase();
          }
        );

        this.departDate = new Date (Date.parse(this.flight_searched.departDate));
        this.departDate = this.departDate.toDateString();
        this.returnDate = new Date (Date.parse(this.flight_searched.returnDate));
        this.returnDate = this.returnDate.toDateString();
        
       
      });
  }

  //font-awesome
  faPlaneDeparture = faPlaneDeparture;
  faCircleInfo = faCircleInfo;

  
  yourFn(event : any){
    console.log("Hello");
  }

  startTime : string = "13:30";


  formatHour(x : number){
    var s = x.toString();
    if(s.length == 1){
      s = "0" + s;
    }
    return s;
  }

}

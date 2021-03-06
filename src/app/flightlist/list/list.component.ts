import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';
import { SearchService } from 'src/app/service/search/search.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  flights : any[] = [];
  from : string = "";
  to : string = "";
  turn : string;

  departDate_2 : any ;

  appear : boolean = false; //an list neu khong cos chuyen bay phu hop

  constructor(private search : SearchService, private storage : LocalstorageService, private route : ActivatedRoute, private router : Router) { 
    //set header info
    this.storage.removeItem('status');
    this.flight_searched = this.storage.getItem('flight_searched');

    this.checkValidFlight();

    this.search.search_name_airport(this.flight_searched.origin).subscribe(
      data => {
        this.originLocation = data.result;
        this.flightOriginName = this.originLocation[0].name.toUpperCase();
      }
    );

    this.search.search_name_airport(this.flight_searched.destination).subscribe(
      data => {
        this.destinationLocation = data.result;
        this.flightDestinationName = this.destinationLocation[0].name.toUpperCase();
      }
    );

    this.departDate = new Date (Date.parse(this.flight_searched.departDate));
    this.departDate = this.departDate.toDateString();
    this.returnDate = new Date (Date.parse(this.flight_searched.returnDate));
    this.returnDate = this.returnDate.toDateString();

    setTimeout(() => {
      if(this.appear == false){
        
    
        //param
        this.route.params.subscribe(params => {
          this.turn = params.turn;
          this.search.search_sv(params).subscribe(
            data => {
              if(data.length == 0){
                this.appear = true;
              }
              else
              {
                this.flights = data.ob;
                this.from = this.flights[0].departure.name.toUpperCase();
                this.to = this.flights[0].destination.name.toUpperCase();
                this.flights.map((item) => {
                  item.departTime = new Date (Date.parse(item.departureTime));
                  item.departHour = this.formatHour(item.departTime.getHours()) + ":" + this.formatHour(item.departTime.getMinutes());
                  item.departHour1 = this.formatHour(item.departTime.getHours()) + "h" + this.formatHour(item.departTime.getMinutes()) + "m";
                  item.departDate = item.departTime.toDateString();
    
                  this.departDate_2= item.departDate;
                  
                  item.arrivedTime = this.search.addHour(item.departTime.getHours(), item.departTime.getMinutes(), item.timeTemp.hour, item.timeTemp.minute);
                  
                  item.arrivedDateTime = new Date (item.departDate);
                  item.arrivedDateTime.setMinutes(item.departTime.getMinutes() + item.timeTemp.minute)
                  item.arrivedDateTime.setHours(item.departTime.getHours() + item.timeTemp.hour);
                });
              }
             
            })
          });
      }
    }, 500)
    
  }

  flight : any;
  flight_searched : any;

  //header info;
  returnDate : any;
  departDate : any;
  flightOriginName : string;
  flightDestinationName : string;

  originLocation : any;
  destinationLocation : any;

  ngOnInit(): void {
    
    

  }

  //font-awesome
  faPlaneDeparture = faPlaneDeparture;
  faCircleInfo = faCircleInfo;
  faSpinner = faSpinner;
  faChevronRight = faChevronRight;


  formatHour(x : number){
    var s = x.toString();
    if(s.length == 1){
      s = "0" + s;
    }
    return s;
  }

  checkFlightList : boolean = false;
  checkValidFlight() {
    this.checkFlightList = false;
    this.route.params.subscribe(
      param => {
        console.log("Param");
        console.log(param)
        this.search.search_sv(param).subscribe(
          data => {
            console.log("Flight list")
            console.log(data)
            if(param.turn == 'depart'){
              if(data.ob.length == 0){
                //this.checkFlightList = true;
                this.appear = true
                //alert("Not found flight")
                //return check;
              }
            }
            else {
              if(data.ob.length == 0){
                //this.checkFlightList = true;
                this.appear = true
                this.checkFlightList = true;
                //alert("Not found flight")
                //return check;
              }
            }
          }
        )
      }
    )
    
  }

  directToPurchase(){
    this.flight_searched = this.storage.getItem('flight_searched');
    this.flight_searched.type = true;
    this.storage.setItem('flight_searched', this.flight_searched);
    this.router.navigateByUrl("/purchase");
  }

}

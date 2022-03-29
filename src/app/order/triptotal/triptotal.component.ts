import { AfterContentInit, Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';
import { SearchService } from 'src/app/service/search/search.service';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-triptotal',
  templateUrl: './triptotal.component.html',
  styleUrls: ['./triptotal.component.css']
})
export class TriptotalComponent implements OnInit, AfterContentInit {

  type : boolean;
  flight_searched : any;
  cfc : any[] = [];
  flight : any[] = [];
  fareList : any[] = [];

  flight2 : any[];

  fare : number = 0;
  taxes : number = 0;



  constructor(private storage :LocalstorageService, private search : SearchService, private router : Router) { 
    this.flight_searched = this.storage.getItem('flight_searched');

    this.cfc = this.storage.getItem('cfc');

    for (var i = this.cfc.length-1; i >= 0; i--)
    {
      this.search.search_by_id(this.cfc[i].flightCode).subscribe(
        data => {
          this.flight.push(data);
          console.log(this.flight.length)
          this.flight.map((item) => {
            item[0].departureTime = new Date(Date.parse(item[0].departureTime));
            item[0].departDate = item[0].departureTime.toDateString();
            item[0].departHour = this.search.formatHour(item[0].departureTime.getHours()) + "h" +
                                  this.search.formatHour(item[0].departureTime.getMinutes()) + "m";
            item[0].arrivedTime = this.search.addHour1(item[0].departureTime.getHours(), item[0].departureTime.getMinutes(), item[0].timeTemp.hour, item[0].timeTemp.minute);
            this.fare = (this.fare + item[0].price) * this.flight_searched.quantityPassenger;
            this.taxes = (this.taxes + item[0].price * item[0].percentage.tax) * this.flight_searched.quantityPassenger;
          });
        }
      );
     }
  }
 
  ngOnInit(): void { 
  }

  ngAfterContentInit(): void {
  }
  

  labelDetail : boolean = true;
  labelDetailName : string = "Show Detail";

  changeLabel(){
    this.labelDetail=!this.labelDetail;
    if(this.labelDetail){
      this.labelDetailName="Show Detail"
    }
    else this.labelDetailName="Hide Detail"
  }

  //icon
  faCircleInfo = faCircleInfo;

  calculateFare(originalPrice : number, percentClass : number){
    return originalPrice + originalPrice*percentClass;
  }

  calculateTaxes(originalPrice : number, percentTaxes : number, otherFee : number){
    return originalPrice + originalPrice*percentTaxes;
  }

  payment(){
    this.router.navigateByUrl("/payment");
  }
}

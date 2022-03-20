import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';
import { SearchService } from 'src/app/service/search/search.service';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-triptotal',
  templateUrl: './triptotal.component.html',
  styleUrls: ['./triptotal.component.css']
})
export class TriptotalComponent implements OnInit {

  type : boolean;
  flight_searched : any;
  cfc : string[] = [];
  flight : any[] = [];



  constructor(private storage :LocalstorageService, private search : SearchService) { 
    this.flight_searched = this.storage.getItem('flight_searched');
    this.cfc = this.storage.getItem('cfc');
    for (var i = this.cfc.length-1; i >= 0; i--){
      this.search.search_by_id(this.cfc[i]).subscribe(
        data => {
          this.flight.push(data);

          this.flight.map((item) => {
            item[0].departureTime = new Date(Date.parse(item[0].departureTime));
            item[0].departDate = item[0].departureTime.toDateString();
            item[0].departHour = this.search.formatHour(item[0].departureTime.getHours()) + "h" +
                                  this.search.formatHour(item[0].departureTime.getMinutes()) + "m";
            item[0].arrivedTime = this.search.addHour1(item[0].departureTime.getHours(), item[0].departureTime.getMinutes(), item[0].timeTemp.hour, item[0].timeTemp.minute);
          });
          console.log(this.flight);
        }
      )
    }
  
   
  }

  ngOnInit(): void {
    
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

}

import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { SearchService } from 'src/app/service/search/search.service';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private search : SearchService) { }

  ngOnInit(): void {
  }

  ticketCode : any;
  ticketInfo : any = {
    userInfo : {
      identificationCard : '',
      userName : {
        firstName : "",
        lastName : ""
      }
    },
    trader : '',
    idFlight : {
      airCode : '',
      airName : '',
      departure : {
        id: "",
        name: ""
      },
      destination : {
        id: "",
        name: ""
      },
      departureTime : '',
    },
    service : {
      luggage : {
        LG010: '',
        LG023: '',
      },
      crip : '',
      health : '',
      meal : ''
    }
  };


  ticket : boolean = false;
  ticketString : string = '';

  departureDate : string = "";
  departureTime : string = "";
  
  checkValidTicket : boolean = false;

  searchTicket(){
    this.checkValidTicket = false;
    console.log(this.ticketString)
    if(this.ticketString != ''){
      this.search.searchTicket(this.ticketString).subscribe(
        data => {
          console.log("Data");
          console.log(data);
          if(data.success){
            this.ticketInfo = data.result;
            console.log("Ticket info");
            console.log(this.ticketInfo)
            let departureDate = new Date(Date.parse(this.ticketInfo.idFlight.departureTime));
            console.log(departureDate);
            this.departureDate = departureDate.toDateString();
            this.departureTime = departureDate.getHours()+":" + departureDate.getMinutes();
            this.ticket= true;
          }
          else {
            this.ticket = false;
            this.checkValidTicket = true;
          }
        }
      )
     
    }
  }

  //icon
  faUser = faUser;
  faPlane = faPlane;
  faPlus = faSquarePlus;
  faXmark = faXmark;
  faGlobe = faGlobe;
  faChevronLeft = faChevronLeft;
  faChevronRight  = faChevronRight;
  faExclamation = faCircleExclamation;


  downloadAsPng(){
    const screenshotTarget = <HTMLElement> document.getElementById('ticketdownload');

    html2canvas(screenshotTarget).then((canvas) => {
      const base64image = canvas.toDataURL("image/png");
      var anchor = document.createElement('a');
      anchor.setAttribute("href", base64image);
      anchor.setAttribute("download", `DaTo_${this.ticketString}.png`);
      anchor.click();
      anchor.remove();
    });
    
  }

  showTicket : boolean = false;

  showTicket_fun(){
    this.showTicket = !this.showTicket;
  }

}

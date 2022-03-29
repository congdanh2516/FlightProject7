import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private storage : LocalstorageService) {}

  ngOnInit(): void {
  }

  //info
  faCircleInfo = faCircleInfo;
  faCreditCard = faCreditCard;

  //expire date
  formatString(event : any) {
    var inputChar = String.fromCharCode(event.keyCode);
    var code = event.keyCode;
    var allowedKeys = [8];
    if (allowedKeys.indexOf(code) !== -1) {
      return;
    }
  
    event.target.value = event.target.value.replace(
      /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
    ).replace(
      /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
    ).replace(
      /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
    ).replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
    ).replace(
      /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
    ).replace(
      /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
    ).replace(
      /\/\//g, '/' // Prevent entering more than 1 `/`
    );
  }
  
  buy(){
    var passengers : any[] = [];
    passengers = this.storage.getItem('passenger');
    var contact = this.storage.getItem('contact');
    console.log(contact); //gui thong tin nguoi dat ve

    var cfc : any[] = []; 
    cfc = this.storage.getItem('cfc');

    passengers.map( (item) => {
      var passenger = {
        suffix : item.suffix,
        lastName : item.lastName,
        firstName : item.firstName,
        dateofBirth : item.dateofBirth,
        identification : item.identification
      }
      console.log(passenger); //gui thong tin hang khach
    });

    cfc.map((flight) => {
      passengers.map( (item) => {
        var service : any = {};
        if("luggage" in item){
          service.luggage = item.luggage;
        }
  
        if("services" in item){
          if("meal" in item.services){
            service.meal = item.services.meal;
          }
          if("health" in item.services){
            service.health = item.services.health;
          }
          if("crip" in item.services){
            service.crip = item.services.crip;
          }
        }
        
        var type : boolean;
        if(flight.type == "eco"){
          type = false;
        }
        else type = true;

        var ticket = {
          idFlight : flight.flightCode,
          userInfo : item.identification,
          purchaser : contact.identification,
          trader : type,
          service : service
        };
        
        console.log(ticket);
      })
    })

  }  

}

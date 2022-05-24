import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';
import { OrderService } from 'src/app/service/order/order.service';
import { render } from 'creditcardpayments/creditCardPayments';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { faCcPaypal } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as bootstrap from 'bootstrap';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';


//declare let paypal : any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{


  constructor(private storage : LocalstorageService,
              private order : OrderService, 
              private router : Router,
              private dialogRef : MatDialog) {

  }



  public payPalConfig ? : IPayPalConfig;

  ngOnInit(): void {
      this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'AdunEIlawE9Vvj81PGZcz6rUtBkreGpcvWpiNBlTJB5_a8Of30WjUqIQ9cSKvNtLeeWnCwSeo8n1S26E',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: '1',
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: '1'
                        }
                    }
                },
                items: 
                [
                  // {
                  //   name: 'Enterprise Subscription',
                  //   quantity: '1',
                  //   category: 'DIGITAL_GOODS',
                  //   unit_amount: {
                  //       currency_code: 'USD',
                  //       value: '9.99',
                  //   },
                  // },

                  {
                    name: 'DaTo Ticket',
                    quantity: '1',
                    //category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'USD',
                        value: '1',
                    },
                  }
                ]

            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details : any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
                setTimeout(() => {
                  this.sendInfo();
                  this.router.navigateByUrl("/payment/");
                },1000)
            });
            
        },
        
    };
}



  

  //info
  faCircleInfo = faCircleInfo;
  faCreditCard = faCreditCard;
  faCcPaypal = faCcPaypal;
  faCircleExclamation = faCircleExclamation;


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
  
  services : any[] = [];
  timeOut : number;
  myvar : any;

  buy(){
    clearInterval(this.myvar);
    this.warning = false;

    //gửi yêu cau mã otp lên server, kèm mail
    var contact = this.storage.getItem('contact');
    var mail = {mail : contact.email};
    console.log(mail);
    this.order.senCode(mail).subscribe(
      data =>  this.storage.setItem('otpcode', data)
    )

    this.timeOut = 60;
    this.myvar = setInterval(() => {
      this.timeOut--;
      if(this.timeOut == -1){
        this.storage.setItem('otpcode','');
        clearInterval(this.myvar);
      }
    }, 1000)

  }  

  
  paymentMethod : number = 1;

  changeMethod(){
    console.log("abc");
    if(this.paymentMethod==1)
      this.paymentMethod=2;
    else this.paymentMethod=1;
  }


  otpCode : number;
  warning : boolean = false;

  verify(){ 
    var code = {
      code : this.otpCode,
      encode : this.storage.getItem('otpcode').code
    }
    this.order.verify(code).subscribe(
      data => {
        if(data.success){
          this.sendInfo();
          this.dialogRef.closeAll();
          setTimeout(() => {
            <any>$('#verify').modal('hide')
            this.router.navigateByUrl("/payment/");
          },1000)
        }
        else {
          this.warning=true;
        }
      }
    )
  }

  change(){
    this.warning=false;
  }

  sendInfo(){
    var passengers : any[] = [];
    passengers = this.storage.getItem('passenger');

    this.services = this.storage.getItem('services');

    var contact = this.storage.getItem('contact');

    var userNameContact = {
      suffix : contact.suffix,
      lastName : contact.lastName,
      firstName : contact.firstName,
    }

    var contact_post = {
      userName : userNameContact,
      identificationCard : contact.identification,
      dateOfBirth : contact.dateofBirth,
      userPhoneNumber : contact.phone,
      userEmail : contact.email
    }

    console.log(contact_post);
    this.order.setUserInfo(contact_post).subscribe();

    var cfc : any[] = []; 
    cfc = this.storage.getItem('cfc');

    passengers.map( (item) => {
      var userName ={
        suffix : item.suffix,
        lastName : item.lastName,
        firstName : item.firstName
      }
      var passenger = {
        userName : userName,
        dateOfBirth : item.dateofBirth,
        identificationCard : item.identification
      }
      console.log(passenger); //gui thong tin hang khach
      this.order.setUserInfo(passenger).subscribe();
    });

    for(var x = 0; x < cfc.length; x++){
      for(var i = 0; i < this.services.length; i++){
        let luggage_trip = {
          LG010 : this.services[i][x].luggage.LG010,
          LG023 : this.services[i][x].luggage.LG023
        }

        var trader : boolean = cfc[x].type == 'eco' ? false : true;
        let services = {
          meal :this.services[i][x].meal,
          health : this.services[i][x].health,
          crip : this.services[i][x].crip,
          luggage : luggage_trip
        } 

        let ticket = {
          idFlight : cfc[x].flightCode,
          userInfo : passengers[i].identification,
          purchaser : contact.identification,
          service : services,
          trader : trader,
        }
        console.log(ticket);
        this.order.setFlightTicket(ticket).subscribe();
      }

       //mail
      var mail : any = {
        purchaser : '',
        airCode : '',
        users : [],

      };
      mail.purchaser = contact.identification;
      mail.airCode = cfc[x].flightCode;
      for(let i = 0; i < passengers.length; i++){
        mail.users.push(passengers[i].identification)
      }
      console.log("mail");
      console.log(mail);
      //gui mail

      this.order.sendMail(mail).subscribe();

    }
  }
}

import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TriptotalComponent } from '../order/triptotal/triptotal.component';
import { LocalstorageService } from '../service/localstorage/localstorage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private storage : LocalstorageService, private router : Router, private total : TriptotalComponent) { 
    if(this.storage.getItem('status')){
      this.router.navigateByUrl('/home');
      this.storage.removeItem('status')
    }
  }

  ngOnInit(): void {
    this.storage.setItem('total', this.total.total);
  }

}

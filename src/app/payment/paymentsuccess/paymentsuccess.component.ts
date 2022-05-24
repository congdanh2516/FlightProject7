import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';

@Component({
  selector: 'app-paymentsuccess',
  templateUrl: './paymentsuccess.component.html',
  styleUrls: ['./paymentsuccess.component.css']
})
export class PaymentsuccessComponent implements OnInit {

  constructor(private storage : LocalstorageService) { 
    this.storage.setItem('status', 'success')
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Data } from '@angular/router';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit, OnChanges {

  @Input()appear : boolean;
  constructor(private storage : LocalstorageService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
      var contact = {
        suffix : this.suffix,
        firstName : this.firstName,
        lastName : this.lastName,
        dateofBirth : this.dateofBirth,
        identification : this.identification,
        email : this.email,
        phone : this.phone
      }

      this.storage.setItem('contact', contact);
  }
  //
  suffix : boolean;
  firstName : string;
  lastName : string;
  dateofBirth : Date;
  identification : string;
  email : string;
  phone : string;

  //icon
  faCircleInfo = faCircleInfo;


}

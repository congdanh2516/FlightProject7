import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ticket : boolean = true;
  searchTicket(){
    this.ticket= !this.ticket;
  }

  //icon
  faUser = faUser;
  faPlane = faPlane;
  faPlus = faSquarePlus;
}

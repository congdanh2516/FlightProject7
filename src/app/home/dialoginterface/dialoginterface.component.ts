import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialoginterface',
  templateUrl: './dialoginterface.component.html',
  styleUrls: ['./dialoginterface.component.css']
})
export class DialoginterfaceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  login_var : number;
  getLogin(value : any){
    this.login_var = value;
  }


}

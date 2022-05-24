import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { SearchService } from 'src/app/service/search/search.service';
import { AdministrationComponent } from '../administration.component';
import { Passenger } from 'src/app/model/passenger';
import { BehaviorSubject } from 'rxjs';
import * as $ from "jquery";
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import autoTable from 'jspdf-autotable'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { ManageService } from 'src/app/service/manage/manage.service';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  flight : any = {};
  from : string = "";
  to : string = "";
  departDate : any;
  departTime : any;
  duration : any;
  flightStatus : string = "";

  reasonString : string = "";
  agree : boolean = false;
  passcode : string = "";

  passengerList : any = [];

  flightCode : any;

  constructor(private search : SearchService, private route : ActivatedRoute, private manage : ManageService, private storage : LocalstorageService) { 
    this.route.params.subscribe(
      data => {
        this.search.search_by_id(data.flightCode).subscribe(
          data => {
            this.flightCode = data.flighCode;
            this.flight = data[0];
            this.from = this.flight.departure.name;
            this.to = this.flight.destination.name;
            var departDate = new Date(Date.parse(this.flight.departureTime));
            this.departDate = departDate.toDateString();
            this.departTime = departDate.getHours() + ":" + departDate.getMinutes();
            this.duration = this.flight.timeTemp.hour + " hour(s) and " + this.flight.timeTemp.minute + " minute(s)";

            //flightstatus
            if(this.flight.status == false){
              this.flightStatus = "Cancelled"
            }
            else {
              var now = new Date();
              if(departDate > now){
                this.flightStatus = "Running"
              }
              else {
                this.flightStatus = "Finished"
              }
            }
          }
        )

        this.manage.getPassengerList(data.flightCode).subscribe(
          data => {
            this.passengerList = data.List;
            console.log("passenger list")
            console.log(data.List)
            this.passengerList.map((item : any) => {
              item.dateOfBirth = new Date(Date.parse(item.dateOfBirth));
              item.dateOfBirth = item.dateOfBirth.toDateString();
            })
            console.log("Passenger List")
            console.log(data);
          }
        )
      });

      
  }

  ngOnInit(): void {
  }

  faChevronRight = faChevronRight;
  faFileExcel = faFileExcel;
  faDownload = faDownload;
  faCircleDot =  faCircleDot;
  faCircleExclamation = faCircleExclamation

  //table
  public columnList = ['ID no', 'Last name', 'First name', 'Gender', 'Date of Birth'];
  public dataSource : any;

  get displayColumn() {
    return this.columnList;
  }


  @ViewChild('test', {static:false}) el! : ElementRef

  downloadExcel(){

    let element = document.getElementById('test');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'DT31750.xlsx');
    
  }

  downloadPdf(){
    // var doc = new jsPDF()
    // doc.autoTable({html: '#my-table' })
    // doc.save('table.pdf')
  }

  error : boolean = false;

  cancleFlight(){
    
    this.error = false;
    var token = localStorage.getItem('id_token');
    var verifyInfo = {
      token :  token,
      password : this.passcode
    }

    console.log(verifyInfo);

    this.manage.verifyPassword(verifyInfo).subscribe(
      data => {
        console.log(data)
        if(data.success) {
          this.route.params.subscribe(
            data => {

              var aircode = {
                airCode : data.flightCode,
                reason : this.reasonString,
              }
              
              console.log(aircode);

              this.manage.cancleFlight(aircode).subscribe(
                data => {
                  console.log(data);
                  //<any>$('#cancle').modal('hide');
                  window.location.reload();
              });
          });
        }
        else {
          this.error = true;
        }
      }); 
  }

  checkDate_var : boolean = true;
  checkDate(){
    var departDate = new Date(Date.parse(this.flight.departureTime));
    var now = new Date();
    var duration = (departDate.getTime() - now.getTime()) / (3600*1000);
    if(duration < 24){
      this.checkDate_var=false;
    }
    else this.checkDate_var=true;
  }

  changeError(){
    this.error = false;
  }
}

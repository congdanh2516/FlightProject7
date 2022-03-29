import { Component, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { SharingdataService } from 'src/app/service/sharingdata/sharingdata.service';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-searchnbook',
  templateUrl: './searchnbook.component.html',
  styleUrls: ['./searchnbook.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchnbookComponent implements OnInit {

  constructor(private data: SharingdataService) { }
  selectedIndex=0;


  ngOnInit(): void {
  }
  
  @Output('blur')
  onHandleBlur = new EventEmitter<any>();

  blur : boolean;

  onSubmitForm(){
    this.onHandleBlur.emit(this.blur);
  }

  changeBlur(){
    this.data.changeMessage(true);
  }

  //icon
  faPlane = faPlane;
}

import { Component, OnInit } from '@angular/core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { SharingdataService } from 'src/app/service/sharingdata/sharingdata.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private data : SharingdataService) { }

  ngOnInit(): void {
  }

  faGlobe = faGlobe ;
  faFacebook = faFacebookF;
  faInstagram = faInstagram;
  faCircleUser = faCircleUser;
  faEnvelope = faEnvelope;

  changeBlur(){
    this.data.changeMessage(false);
  }
}

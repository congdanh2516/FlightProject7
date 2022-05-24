import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon"; 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NgxPayPalModule } from 'ngx-paypal';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { SearchComponent } from './home/search/search.component';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './home/login/login.component';
import { DialoginterfaceComponent } from './home/dialoginterface/dialoginterface.component';
import { RegisterComponent } from './home/register/register.component';
import { SearchnbookComponent } from './home/searchnbook/searchnbook.component';
import { HomeComponent } from './home/home.component';
import { AdministrationComponent } from './administration/administration.component';
import { AddflightComponent } from './administration/addflight/addflight.component';
import { FlightlistComponent } from './flightlist/flightlist.component';
import { HeaderinfoComponent } from './flightlist/headerinfo/headerinfo.component';
import { ListComponent } from './flightlist/list/list.component';
import { FooterComponent } from './home/footer/footer.component';
import { SpecificationComponent } from './flightlist/list/specification/specification.component';
import { ClassComponent } from './flightlist/list/class/class.component';
import { OrderComponent } from './order/order.component';
import { TriptotalComponent } from './order/triptotal/triptotal.component';
import { DetailflightComponent } from './order/detailflight/detailflight.component';
import { LugageComponent } from './order/lugage/lugage.component';
import { LuggagepopupComponent } from './order/lugage/luggagepopup/luggagepopup.component';
import { ExpandedserviceComponent } from './order/expandedservice/expandedservice.component';
import { PassengerinfoComponent } from './order/passengerinfo/passengerinfo.component';
import { PlaceComponent } from './home/place/place.component';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutComponent } from './payment/checkout/checkout.component';
import { PassengerPersonalComponent } from './order/passenger-personal/passenger-personal.component';
import { ContactInfoComponent } from './order/contact-info/contact-info.component';
import { LuggagePersonalComponent } from './order/lugage/luggage-personal/luggage-personal.component';
import { ExpandedservicePersonalComponent } from './order/expandedservice/expandedservice-personal/expandedservice-personal.component';
import { ManageComponent } from './home/manage/manage.component';
import { ImagecarouselComponent } from './home/imagecarousel/imagecarousel.component';
import { ImagecardComponent } from './home/imagecarousel/imagecard/imagecard.component';
import { AirplaneComponent } from './home/airplane/airplane.component';
import { AirplanecardComponent } from './home/airplane/airplanecard/airplanecard.component';
import { IntroduceComponent } from './home/introduce/introduce.component';
import { StepperComponent } from './home/stepper/stepper.component';
import { HowtobookComponent } from './home/howtobook/howtobook.component';
import { DetailComponent } from './administration/detail/detail.component';
import { PaymentsuccessComponent } from './payment/paymentsuccess/paymentsuccess.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    LoginComponent,
    DialoginterfaceComponent,
    RegisterComponent,
    SearchnbookComponent,
    HomeComponent,
    AdministrationComponent,
    AddflightComponent,
    FlightlistComponent,
    HeaderinfoComponent,
    ListComponent,
    FooterComponent,
    SpecificationComponent,
    ClassComponent,
    OrderComponent,
    TriptotalComponent,
    DetailflightComponent,
    LugageComponent,
    LuggagepopupComponent,
    ExpandedserviceComponent,
    PassengerinfoComponent,
    PlaceComponent,
    PaymentComponent,
    CheckoutComponent,
    PassengerPersonalComponent,
    ContactInfoComponent,
    LuggagePersonalComponent,
    ExpandedservicePersonalComponent,
    ManageComponent,
    ImagecarouselComponent,
    ImagecardComponent,
    AirplaneComponent,
    AirplanecardComponent,
    IntroduceComponent,
    StepperComponent,
    HowtobookComponent,
    DetailComponent,
    PaymentsuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSnackBarModule,
    IvyCarouselModule,
    NgxPayPalModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

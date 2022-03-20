import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddflightComponent } from './administration/addflight/addflight.component';
import { AdministrationComponent } from './administration/administration.component';
import { FlightlistComponent } from './flightlist/flightlist.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {path : 'home', component : HomeComponent},
  {path : '', redirectTo : 'home', pathMatch : 'full'},
  {path : 'admin', component : AdministrationComponent},
  {path : 'admin/create', component : AddflightComponent},
  {path : 'flightlist', component :  FlightlistComponent},
  {path : 'purchase', component : OrderComponent},
  {path : 'payment', component : PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddflightComponent } from './administration/addflight/addflight.component';
import { AdministrationComponent } from './administration/administration.component';
import { DetailComponent } from './administration/detail/detail.component';
import { FlightlistComponent } from './flightlist/flightlist.component';
import { ListComponent } from './flightlist/list/list.component';
import { HomeComponent } from './home/home.component';
import { DetailflightComponent } from './order/detailflight/detailflight.component';
import { OrderComponent } from './order/order.component';
import { PassengerinfoComponent } from './order/passengerinfo/passengerinfo.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentsuccessComponent } from './payment/paymentsuccess/paymentsuccess.component';
import { AuthGuardService } from './service/guard/auth-guard.service';

const routes: Routes = [
  {path : 'home', component : HomeComponent},
  {path : '', redirectTo : 'home', pathMatch : 'full'},
  {path : 'admin', component : AdministrationComponent, canActivate : [AuthGuardService]},
  {path : 'admin/create', component : AddflightComponent},
  {path : 'admin/detail/:flightCode', component : DetailComponent},
  {path : 'list/:origin/:destination/:type/:departDate/:quantityPassenger/:turn', component :  ListComponent},
  {path : 'purchase', component : PassengerinfoComponent},
  {path : 'payment', component : PaymentComponent},
  {path : 'payment/' , component : PaymentsuccessComponent},
  {path : '**', component : HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

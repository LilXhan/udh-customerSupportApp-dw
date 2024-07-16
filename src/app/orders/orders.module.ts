import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewOrderPageComponent } from './pages/new-order-page/new-order-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderLayoutComponent } from './layouts/order-layout/order-layout.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NewOrderPageComponent,
    OrdersPageComponent,
    OrderLayoutComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule
]
})
export class OrdersModule { }

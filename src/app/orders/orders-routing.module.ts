import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { NewOrderPageComponent } from './pages/new-order-page/new-order-page.component';
import { OrderLayoutComponent } from './layouts/order-layout/order-layout.component';

const routes: Routes = [
 {
  path: '',
  component: OrderLayoutComponent,
  children: [
    {
      path: 'new-order',
      component: NewOrderPageComponent
    },
    {
      path: '',
      component: OrdersPageComponent
    }
  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}

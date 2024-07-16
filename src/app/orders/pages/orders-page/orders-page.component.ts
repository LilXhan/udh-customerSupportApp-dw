import { Component, inject } from '@angular/core';
import { Order } from '../../interfaces/order.interface';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html'
})
export class OrdersPageComponent {
  public orders: Order[] = [];
  private ordersService = inject(OrdersService)
  private router = inject(Router)
  ngOnInit(): void {
    this.ordersService.getOrders()
    .subscribe(orders => {
      this.orders = orders;
    });
  }

  updateOrder(id: number, order: Order) {
    this.ordersService.putOrder(id, order).subscribe({
      next: () => this.router.navigateByUrl('/orders'),
      error: (err) => {
        Swal.fire('Error', err, 'error')
      }
    });
  }

  removeOrder(id: number) {
    this.ordersService.deleteOrder(id).subscribe({
      next: () => this.router.navigateByUrl('/orders'),
      error: err => {
        Swal.fire('Error', err, 'error');
      } 
    });
  }
  
}

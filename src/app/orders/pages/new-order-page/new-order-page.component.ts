import { Component, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-order-page',
  templateUrl: './new-order-page.component.html'
})
export class NewOrderPageComponent {

  private fb = inject(FormBuilder);
  private ordersService = inject(OrdersService)
  private router = inject(Router)
  private authService = inject(AuthService)
  public currentUser = computed(() => this.authService.currentUser())

  public myForm: FormGroup = this.fb.group({
    titulo: ['', [Validators.required, Validators.maxLength(20)]],
    descripcion: ['', [Validators.required, Validators.maxLength(30)]],
    total: ['', [Validators.required, Validators.min(0)]]
    })

  createOrder() {
    const usuario = this.currentUser()!.id

    const newOrder = {
      ...this.myForm.value,
      usuario
    };

    this.ordersService.postOrder(newOrder).subscribe({
      next: () => this.router.navigateByUrl('/orders'),
      error: err => {
        Swal.fire('Error', err, 'error')
      }
    });
  }

}

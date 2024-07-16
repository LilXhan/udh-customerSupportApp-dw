import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-layout',
  templateUrl: './order-layout.component.html'
})
export class OrderLayoutComponent {
  private authService = inject(AuthService)

  public currentUser = computed(() => this.authService.currentUser())
  public router = inject(Router)
}

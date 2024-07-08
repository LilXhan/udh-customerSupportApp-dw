import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-tickets-layout',
  templateUrl: './tickets-layout.component.html',
  styleUrl: './tickets-layout.component.css'
})
export class TicketsLayoutComponent {

  private authService = inject(AuthService)

  public currentUser = computed(() => this.authService.currentUser())

}

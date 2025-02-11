import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets-layout',
  templateUrl: './tickets-layout.component.html',
  styleUrl: './tickets-layout.component.css'
})
export class TicketsLayoutComponent {

  private authService = inject(AuthService)

  public currentUser = computed(() => this.authService.currentUser())
  public router = inject(Router)

}

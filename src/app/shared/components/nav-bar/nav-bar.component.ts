import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {

  public authService = inject(AuthService)
  public items: MenuItem[] | undefined;
  public token =  localStorage.getItem('token')
  public currentUser = this.authService.currentUser();

  constructor ( private router: Router) {}
  ngOnInit() {
    this.items = [
      {
        label: 'Tickets',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/tickets']
      },
      {
        label: 'Pedidos',
        icon: 'pi pi-fw pi-star',
        routerLink: ['/orders']
      }
      ];      
    }

    onLogout() {
      this.authService.logout();
    }
}

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
  
  constructor ( private router: Router) {}
  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/home']
      },
      {
        label: 'Features',
        icon: 'pi pi-fw pi-star',
        routerLink: ['/features']
      },
      {
        label: 'Projects',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Project 1',
            icon: 'pi pi-fw pi-briefcase',
            routerLink: ['/projects/project1']
          },
          {
            label: 'Project 2',
            icon: 'pi pi-fw pi-briefcase',
            routerLink: ['/projects/project2']
          }
        ]
      },
      {
        label: 'Contact',
        icon: 'pi pi-fw pi-envelope',
        routerLink: ['/contact']
      }
    ];
    }

    onLogout() {
      this.authService.logout();
    }

}

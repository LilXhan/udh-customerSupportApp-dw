import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isNotAuthenticated, isAuthenticatedGuard } from './auth/guards';

const routes: Routes = [
  {
    path: 'tickets',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule) 
  },
  {
    path: 'auth',
    canActivate: [isNotAuthenticated],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

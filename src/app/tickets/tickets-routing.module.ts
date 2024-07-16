import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TicketsPageComponent } from './pages/tickets-page/tickets-page.component';
import { TicketsLayoutComponent } from './layouts/tickets-layout/tickets-layout.component';
import { TicketPageComponent } from './pages/ticket-page/ticket-page.component';
import { NewTicketPageComponent } from './pages/new-ticket-page/new-ticket-page.component';


const routes: Routes = [
  {
    path: '',
    component: TicketsLayoutComponent,
    children: [
      {
        path: '',
        component: TicketsPageComponent
      },
      {
        path: 'by/:id',
        component: TicketPageComponent
      },
      {
        path: 'new-ticket',
        component: NewTicketPageComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TicketsRoutingModule {}

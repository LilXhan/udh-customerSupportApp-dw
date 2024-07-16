import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsRoutingModule } from './tickets-routing.module';

import { TicketsPageComponent } from './pages/tickets-page/tickets-page.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { TicketsLayoutComponent } from './layouts/tickets-layout/tickets-layout.component';
import { TicketPageComponent } from './pages/ticket-page/ticket-page.component';
import { NewTicketPageComponent } from './pages/new-ticket-page/new-ticket-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TicketsPageComponent,
    TicketsLayoutComponent,
    TicketPageComponent,
    NewTicketPageComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    PrimeNgModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class TicketsModule { }

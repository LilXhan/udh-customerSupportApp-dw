import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsRoutingModule } from './tickets-routing.module';

import { TicketsTableComponent } from './components/tickets-table/tickets-table.component';
import { TicketsPageComponent } from './pages/tickets-page/tickets-page.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { TicketsLayoutComponent } from './layouts/tickets-layout/tickets-layout.component';
import { TicketPageComponent } from './pages/ticket-page/ticket-page.component';

@NgModule({
  declarations: [
    TicketsTableComponent,
    TicketsPageComponent,
    TicketsLayoutComponent,
    TicketPageComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    PrimeNgModule,
    SharedModule
  ]
})
export class TicketsModule { }

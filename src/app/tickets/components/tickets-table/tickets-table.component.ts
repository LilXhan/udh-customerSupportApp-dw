import { Component, computed, inject, Input } from '@angular/core';
import { Ticket } from '../../interfaces/ticket';
import { AuthService } from '../../../auth/services/auth.service';
import { TicketsService } from '../../services/tickets.service';
import { User } from '../../../auth/interfaces';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'tickets-table',
  templateUrl: './tickets-table.component.html'
})
export class TicketsTableComponent {

  private authService = inject(AuthService);
  public ticketsService = inject(TicketsService)
  public router = inject(Router)

  public currentUserAuthenticated = computed(() => this.authService.currentUser())
  public authStatus = computed(() => this.authService.authStatus())
  
  @Input()
  public tickets: Ticket[] = [];

  asignAgentToTicket(ticket: Ticket, idAgente: number): void {
    const newTicket = {
      ...ticket,
      agente: idAgente
    } 
    this.ticketsService.assignAgentToTicket(newTicket).subscribe(() => {
      this.ticketsService.getTickets().subscribe(tickets =>{
        this.tickets = tickets;
      });
    });
  };
};

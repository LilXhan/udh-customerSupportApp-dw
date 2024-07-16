import { Component, computed, inject } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../interfaces/ticket';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-tickets-page',
  templateUrl: './tickets-page.component.html'
})
export class TicketsPageComponent {

  public tickets: Ticket[] = [];
  private authService = inject(AuthService);
  public ticketsService = inject(TicketsService)
  public router = inject(Router)

  public currentUserAuthenticated = computed(() => this.authService.currentUser())
  public authStatus = computed(() => this.authService.authStatus())
  

  asignAgentToTicket(ticket: Ticket, idAgente: number): void {
    const newTicket = {
      ...ticket,
      agente: idAgente
    } 
    this.ticketsService.assignAgentToTicket(newTicket).subscribe(() => {
      this.ticketsService.getTickets().subscribe(tickets =>{
        this.tickets = tickets;
        this.replaceUserIdsWithUsersObjects();
        this.replaceAgenteIdsWithAgentsObjects();
      });
    });
  };

  ngOnInit(): void {
    this.ticketsService.getTickets()
    .subscribe(tickets => {
      this.tickets = tickets;
      this.replaceUserIdsWithUsersObjects();
      this.replaceAgenteIdsWithAgentsObjects();
    });
  }

  replaceUserIdsWithUsersObjects(): void {
    const userRequests = this.tickets.map(ticket => this.ticketsService.getOwnerTicket(ticket.usuario));
    forkJoin(userRequests).subscribe(users => {
      this.tickets = this.tickets.map((ticket, index) => {
        return {
          ...ticket,
          userInfo: users[index]
        };
      });
    });
  }
  
  replaceAgenteIdsWithAgentsObjects(): void {
    const agentsRequests = this.tickets.map(ticket => this.ticketsService.getAgentTicket(ticket.agente));
    forkJoin(agentsRequests).subscribe(agents => {
      this.tickets = this.tickets.map((ticket, index) => {
        return {
          ...ticket,
          agentInfo: agents[index]
        };
      });
    });
  }
}

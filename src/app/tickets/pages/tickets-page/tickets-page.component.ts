import { Component } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../interfaces/ticket';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tickets-page',
  templateUrl: './tickets-page.component.html'
})
export class TicketsPageComponent {

  public tickets: Ticket[] = [];

  constructor( private ticketsService: TicketsService ) {}

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

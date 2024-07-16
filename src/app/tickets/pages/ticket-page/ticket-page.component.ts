import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService } from '../../services/tickets.service';
import { forkJoin, switchMap } from 'rxjs';
import { Ticket } from '../../interfaces/ticket';
import { Order } from '../../../orders/interfaces/order.interface';
import { User } from '../../../auth/interfaces';
import { OrdersService } from '../../../orders/services/orders.service';

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrl: './ticket-page.component.css'
})
export class TicketPageComponent {

  public ticket?: Ticket;
  public activatedRouter = inject(ActivatedRoute)
  public ticketsService = inject(TicketsService)
  public ordersService = inject(OrdersService)
  public router = inject(Router)
  public order?: Order;
  public agente?: User;
  public ticketFullInfo: any = {};


  ngOnInit(): void {
    this.activatedRouter.params
    .pipe(
      switchMap( ({ id }) => this.ticketsService.getTicketById(id)),
      switchMap(ticket => {
        if (!ticket) {
          this.router.navigateByUrl('');
          return []; 
        }
        this.ticket = ticket;

        const userRequest = this.ticketsService.getOwnerTicket(ticket.usuario);
        const agentRequest = this.ticketsService.getAgentTicket(ticket.agente);
        const orderRequest = this.ordersService.retrieveOrder(ticket.pedido);

        return forkJoin([userRequest, agentRequest, orderRequest]);
      })
    )
    .subscribe({
      next: ([user, agent, order]) => {
        if (this.ticket) {
          this.ticketFullInfo = {
            ...this.ticket,
            userInfo: user,
            agentInfo: agent,
            orderInfo: order
          };
        }
      }
    })
  }


}

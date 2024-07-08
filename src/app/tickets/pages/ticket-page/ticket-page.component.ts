import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService } from '../../services/tickets.service';
import { switchMap } from 'rxjs';
import { Ticket } from '../../interfaces/ticket';

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrl: './ticket-page.component.css'
})
export class TicketPageComponent {

  public ticket?: Ticket;
  public activatedRouter = inject(ActivatedRoute)
  public ticketsService = inject(TicketsService)
  public router = inject(Router)

  ngOnInit(): void {
    this.activatedRouter.params
    .pipe(
      switchMap( ({ id }) => this.ticketsService.getTicketById(id))
    )
    .subscribe( ticket => {
      if ( !ticket ) {
        return this.router.navigateByUrl('');
      }
      return this.ticket = ticket;
    })
  }
}

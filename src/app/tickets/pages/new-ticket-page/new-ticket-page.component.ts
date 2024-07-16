import { Component, computed, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../interfaces/ticket';
import Swal from 'sweetalert2';
import { Order } from '../../../orders/interfaces/order.interface';
import { OrdersService } from '../../../orders/services/orders.service';

@Component({
  selector: 'app-new-ticket-page',
  templateUrl: './new-ticket-page.component.html',
  styleUrl: './new-ticket-page.component.css'
})
export class NewTicketPageComponent implements OnInit {


  private fb = inject(FormBuilder);
  public authService = inject(AuthService);
  private router = inject(Router)
  public currentUser = computed(() => this.authService.currentUser())
  private ticketsService = inject(TicketsService) 
  private ordersService = inject(OrdersService)
  public ordersCurrentUser: Order[] = [];

  public myForm: FormGroup = this.fb.group({
    asunto: ['', [Validators.required, Validators.minLength(10)]],
    descripcion: ['', [Validators.required, Validators.maxLength(100)]],
    canal: [{value: 'Formulario Web', disabled: true}, Validators.required],
    grupo: [{value: 'Soporte', disabled: true}, Validators.required],
    usuario: [this.currentUser()?.id],
    pedido: ['', [Validators.required]],
  })


  ngOnInit(): void {
    this.ordersService.getOrders().subscribe(
      orders => {
        this.ordersCurrentUser = orders;
      }
    );
  }

  createTicket() {
    
    const { id } = this.myForm.value.pedido;

    const newTicket: Ticket = {
      ...this.myForm.value,
      pedido: id,
      canal: 'Soporte',
      grupo: 'Formulario Web'
    }
      
    this.ticketsService.createTicket(newTicket).subscribe({
      next: () => this.router.navigateByUrl('/tickets'),
      error: (err) => {
        Swal.fire('Error', err, 'error')
      }
    })
    
  };

}

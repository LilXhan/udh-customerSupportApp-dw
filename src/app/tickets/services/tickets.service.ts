import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Ticket } from '../interfaces/ticket';
import { User } from '../../auth/interfaces';
import { enviroments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private apiUrl: string = enviroments.baseUrl

  constructor ( private http: HttpClient ) {}

  getTickets(): Observable<Ticket[]> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'API-KEY': 'misuperapikey'
    })

    return this.http.get<Ticket[]>(`${this.apiUrl}/api/tickets/`, { headers })
      .pipe(
        catchError( _ => of([]))
      );
  }

  getTicketById(id: number): Observable<Ticket | null> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'API-KEY': 'misuperapikey'
    })
    return this.http.get<Ticket>(`${this.apiUrl}/api/tickets/${id}/`, { headers })
      .pipe(
        catchError( _ => of(null))
      );
  }

  getOwnerTicket(id: number): Observable<User | null> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'API-KEY': 'misuperapikey'
    })

    return this.http.get<User>(`${this.apiUrl}/api/users/${id}`, { headers })
      .pipe(
        catchError( _ => of(null))
      );
  }

  getAgentTicket(id: number): Observable<User | null> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'API-KEY': 'misuperapikey'
    })

    if (id === null) return of(null)

    return this.http.get<User>(`${this.apiUrl}/api/users/${id}`, { headers })
      .pipe(
        catchError( _ => of(null))
      );
  }

  assignAgentToTicket(ticket: Ticket): Observable<Ticket> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'API-KEY': 'misuperapikey'
    });

    return this.http.put<Ticket>(`${this.apiUrl}/api/tickets/${ticket.id}/`, ticket, { headers });
  }

  createTicket(ticket: Ticket):  Observable<Ticket> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'API-KEY': 'misuperapikey'
    });

    return this.http.post<Ticket>(`${this.apiUrl}/api/tickets/`, ticket, { headers });
  }

}
import { Injectable } from '@angular/core';
import { enviroments } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiUrl: string = enviroments.baseUrl

  constructor ( private http: HttpClient ) {}

  getOrders(): Observable<Order[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'API-KEY': 'misuperapikey'
    });

    return this.http.get<Order[]>(`${this.apiUrl}/api/orders/`, { headers })
      .pipe(catchError(_ => of([])));
  }

  putOrder(id: number, order: Order): Observable<Order> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'API-KEY': 'misuperapikey'
    });

    return this.http.put<Order>(`${this.apiUrl}/api/orders/${id}/`, order, { headers })
  }

  deleteOrder(id: number): Observable<Order> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'API-KEY': 'misuperapikey'
    });
    return this.http.delete<Order>(`${this.apiUrl}/api/orders/${id}/`, { headers });
  }

  postOrder(order: Order): Observable<Order> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'API-KEY': 'misuperapikey'
    });

    return this.http.post<Order>(`${this.apiUrl}/api/orders/`, order, { headers });
  }

  retrieveOrder(id: number): Observable<Order | null> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'API-KEY': 'misuperapikey'
    });
    return this.http.get<Order>(`${this.apiUrl}/api/orders/${id}`, { headers })
      .pipe(catchError(_ => of(null)));
  }
}
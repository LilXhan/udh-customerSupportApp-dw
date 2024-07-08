import { computed, inject, Injectable, signal } from '@angular/core';
import { enviroments } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, AuthStatus, LoginResponse, CheckTokenResponse } from '../interfaces';
import { Observable, map, catchError, throwError, of, last } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = enviroments.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe()
  }

  private setAuthentication(access: string){
    this.getInfoUserByToken(access).subscribe(user => this._currentUser.set(user));
    this._authStatus.set( AuthStatus.authenticated );    
    localStorage.setItem('token', access);
    return true;
  }


  login( email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/api/auth/login`;
    const body = { email, password }

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map( ({ refresh, access }) => this.setAuthentication(access) ),
        catchError( err =>  throwError( () => err.error.detail ))
      );
  }

  register(newUser: object): Observable<boolean> {
    const url = `${this.baseUrl}/api/auth/register`;
    
    return this.http.post(url, newUser)
    .pipe(
      map( () => true ),
      catchError( err =>  throwError( () => err.error.detail ))
    );
  }

  getInfoUserByToken(token: string): Observable<User> {
    const url = `${this.baseUrl}/api/auth/me`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const options = { headers: headers }
    return this.http.get<User>(url, options);
  }


  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/api/auth/me`;
    const token = localStorage.getItem('token')
    
    if (!token)  {
      this.logout();
      return of(false); 
    }
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const options = { headers: headers }
    return this.http.get<CheckTokenResponse>(url, options)
      .pipe(
        map( _ => this.setAuthentication(token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.checking);          
          return of(false);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this._authStatus.set(AuthStatus.notAuthenticated);
    this._currentUser.set(null);
  }

}
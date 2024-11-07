import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080/api/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  private emailSubject = new BehaviorSubject<string | null>(localStorage.getItem('email'));
  private errorMessageSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
  }

  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  email$: Observable<string | null> = this.emailSubject.asObservable();
  errorMessage$: Observable<string | null> = this.errorMessageSubject.asObservable();

  login(token: string, email: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    this.isLoggedInSubject.next(true);
    this.emailSubject.next(email);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.isLoggedInSubject.next(false);
    this.emailSubject.next(null);
  }

  performLogin(email: string, password: string): void {
    this.http.post<{ token: string, email: string }>(`${this.url}/authenticate`, {email, password})
      .subscribe(
        response => {
          this.login(response.token, response.email);
          this.router.navigate(['/']);
          this.errorMessageSubject.next(null);
        },
        error => {
          this.errorMessageSubject.next('Invalid email or password');
          console.error('Login failed', error);
        }
      );
  }

  register(email: string, password: string, role: string): void {
    this.http.post<{ token: string, email: string }>(`${this.url}/register`, { email, password, role })
      .subscribe(
        response => {
          this.login(response.token, response.email);
          this.errorMessageSubject.next(null);
          this.router.navigate(['/']);
        },
        error => {
          this.errorMessageSubject.next('Registration failed');
          console.error('Registration failed', error);
        }
      );
  }
}

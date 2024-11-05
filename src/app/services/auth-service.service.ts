// auth-service.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  private emailSubject = new BehaviorSubject<string | null>(localStorage.getItem('email'));

  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  email$: Observable<string | null> = this.emailSubject.asObservable();

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
}

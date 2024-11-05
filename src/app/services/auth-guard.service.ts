import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    console.log("ovo je token, " + token);

    if (!token) {
      // No token, redirect to login
      this.router.navigate(['/login']);
      return false;
    }

    // Token exists, allow access
    return true;
  }
}

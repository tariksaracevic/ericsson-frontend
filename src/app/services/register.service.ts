import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user.interface';
import {HttpClient} from '@angular/common/http';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {
  }

  register(email: string, password: string, role: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/register`, {
      email,
      password,
      role
    });
  }
}

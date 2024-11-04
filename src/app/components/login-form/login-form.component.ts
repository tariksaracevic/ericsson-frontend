import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatCard
  ],
  standalone: true
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: LoginService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        response => {
          console.log('Login successful, token:', response.token);
          localStorage.setItem('token', response.token); // Store the token
          console.log(localStorage.getItem('token'));
          // Navigate to another page or handle success
        },
        error => {
          console.error('Login failed', error);
          // Handle error (e.g., show message to the user)
        }
      );
    }
  }
}

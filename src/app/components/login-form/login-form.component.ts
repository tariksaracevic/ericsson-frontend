import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { LoginService } from '../../services/login.service';
import {MatError, MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatCard,
    MatError,
    MatFormField,
    MatInput
  ],
  standalone: true
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn: boolean = false;
  errorMessage: string | null = null;
  readonly errorMessageSubscription: Subscription;


  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.errorMessageSubscription = this.authService.errorMessage$.subscribe(
      (errorMessage) => {
        this.errorMessage = errorMessage;
      }
    );
  }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

ngOnDestroy(): void {
  if (this.errorMessageSubscription) {
  this.errorMessageSubscription.unsubscribe();
}
}

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
  }

  handleRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.performLogin(email, password);
      console.log(this.errorMessage)
    }
  }
}

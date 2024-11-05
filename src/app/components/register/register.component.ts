import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {RegisterService} from '../../services/register.service';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatCard,
    MatRadioGroup,
    MatRadioButton
  ],
  standalone: true
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: RegisterService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  handleRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const {email, password, role} = this.registerForm.value;
      this.authService.register(email, password, role).subscribe(
        response => {
          console.log('Register successful, token:', response.token);
          localStorage.setItem('token', response.token); // Store the token
          console.log(localStorage.getItem('token'));
          // Navigate to another page or handle success
        },
        error => {
          console.error('Register failed', error);
          // Handle error (e.g., show message to the user)
        }
      );
    }
  }
}

import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {Router} from '@angular/router';
import {RegisterService} from '../../services/register.service';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatError, MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {AuthService} from '../../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatCard,
    MatRadioGroup,
    MatRadioButton,
    MatError,
    MatFormField,
    MatInput
  ],
  standalone: true
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  onSubmit() :void {
    if (this.registerForm.valid) {
      const {email, password, role} = this.registerForm.value;
      this.authService.register(email, password, role);
    }
  }
}

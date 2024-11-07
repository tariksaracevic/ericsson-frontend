import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth-service.service';
import {Router, RouterLink} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    RouterLink,
  ],
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  isLoggedIn = false;
  email: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn) => (this.isLoggedIn = loggedIn));
    this.authService.email$.subscribe((email) => (this.email = email));
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

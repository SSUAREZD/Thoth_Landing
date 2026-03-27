import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './portal.html',
  styleUrl: './portal.css',
})
export class PortalComponent {
  auth = inject(AuthService);
  private router = inject(Router);
  sidebarOpen = signal(false);

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
  }
}

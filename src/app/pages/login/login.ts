import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  userName = '';
  password = '';
  isLoading = signal(false);
  errorMessage = signal('');

  onSubmit() {
    if (!this.userName.trim() || !this.password.trim()) {
      this.errorMessage.set('Por favor completa todos los campos.');
      return;
    }
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.userService.getAll().subscribe({
      next: (users) => {
        const match = users.find(
          u => u.userName?.toLowerCase() === this.userName.toLowerCase() && u.password === this.password
        );
        if (match) {
          this.authService.login(match);
          this.router.navigate(['/app/home']);
        } else {
          this.errorMessage.set('Usuario o contraseña incorrectos.');
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al conectar con el servidor.');
        this.isLoading.set(false);
      },
    });
  }
}

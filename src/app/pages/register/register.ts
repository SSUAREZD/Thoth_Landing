import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  name = '';
  lastName = '';
  userName = '';
  password = '';
  confirmPassword = '';
  isLoading = signal(false);
  errorMessage = signal('');

  onSubmit() {
    if (!this.name.trim() || !this.lastName.trim() || !this.userName.trim() || !this.password.trim()) {
      this.errorMessage.set('Por favor completa todos los campos.');
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage.set('Las contraseñas no coinciden.');
      return;
    }
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.userService.create({
      name: this.name,
      lastName: this.lastName,
      userName: this.userName,
      password: this.password,
    }).subscribe({
      next: (user) => {
        this.authService.login(user);
        this.router.navigate(['/app/home']);
      },
      error: () => {
        this.errorMessage.set('Error al crear la cuenta. El usuario puede ya existir.');
        this.isLoading.set(false);
      },
    });
  }
}

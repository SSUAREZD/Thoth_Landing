import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PhoneService } from '../../../../core/services/phone.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-add-phone',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-phone.html',
  styleUrl: './add-phone.css',
})
export class AddPhoneComponent {
  private phoneService = inject(PhoneService);
  private auth = inject(AuthService);
  private router = inject(Router);

  name = '';
  length = '';
  width = '';
  gyroCamera = '';
  gyroBelow = '';

  isLoading = signal(false);
  errorMessage = signal('');

  onSubmit() {
    if (!this.name.trim()) { this.errorMessage.set('El nombre es requerido.'); return; }
    const l = parseFloat(this.length);
    const w = parseFloat(this.width);
    const gc = parseFloat(this.gyroCamera);
    const gb = parseFloat(this.gyroBelow);
    if (isNaN(l) || isNaN(w) || isNaN(gc) || isNaN(gb)) {
      this.errorMessage.set('Todos los valores numéricos deben ser válidos.');
      return;
    }
    const userId = this.auth.currentUser()?.id;
    if (!userId) return;
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.phoneService.create({ name: this.name, length: l, width: w, gyroscopeDistanceToCamera: gc, gyroscopeDistanceToBelow: gb, userId }).subscribe({
      next: () => this.router.navigate(['/app/phones']),
      error: () => { this.errorMessage.set('Error al registrar teléfono.'); this.isLoading.set(false); },
    });
  }
}

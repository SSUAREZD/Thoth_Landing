import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PhoneService } from '../../../../core/services/phone.service';
import { AuthService } from '../../../../core/services/auth.service';
import { PhoneDTO } from '../../../../core/models/models';

@Component({
  selector: 'app-phone-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './phone-list.html',
  styleUrl: './phone-list.css',
})
export class PhoneListComponent implements OnInit {
  private phoneService = inject(PhoneService);
  auth = inject(AuthService);

  phones = signal<PhoneDTO[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');

  ngOnInit() { this.load(); }

  load() {
    const userId = this.auth.currentUser()?.id;
    if (!userId) return;
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.phoneService.getByUser(userId).subscribe({
      next: (data) => { this.phones.set(data); this.isLoading.set(false); },
      error: () => { this.errorMessage.set('Error al cargar teléfonos.'); this.isLoading.set(false); },
    });
  }

  delete(id: string | number) {
    if (!confirm('¿Eliminar este teléfono?')) return;
    this.phoneService.delete(id).subscribe({
      next: () => this.phones.update(list => list.filter(p => p.id !== id)),
      error: () => alert('Error al eliminar.'),
    });
  }
}

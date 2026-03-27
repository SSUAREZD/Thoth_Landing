import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { PhoneService } from '../../../core/services/phone.service';
import { PhoneDTO } from '../../../core/models/models';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class SettingsComponent implements OnInit {
  auth = inject(AuthService);
  private userService = inject(UserService);
  private phoneService = inject(PhoneService);

  phones = signal<PhoneDTO[]>([]);
  phonesLoading = signal(true);
  phonesError = signal('');

  editMode = signal(false);
  name = '';
  lastName = '';
  userName = '';
  password = '';

  saving = signal(false);
  saveError = signal('');
  saveSuccess = signal(false);

  ngOnInit() { this.loadPhones(); }

  loadPhones() {
    const userId = this.auth.currentUser()?.id;
    if (!userId) return;
    this.phonesLoading.set(true);
    this.phonesError.set('');
    this.phoneService.getByUser(userId).subscribe({
      next: (data) => { this.phones.set(data); this.phonesLoading.set(false); },
      error: () => { this.phonesError.set('Error al cargar teléfonos.'); this.phonesLoading.set(false); },
    });
  }

  deletePhone(id: string | number) {
    if (!confirm('¿Eliminar este teléfono?')) return;
    this.phoneService.delete(id).subscribe({
      next: () => this.phones.update(list => list.filter(p => p.id !== id)),
      error: () => alert('Error al eliminar.'),
    });
  }

  startEdit() {
    const u = this.auth.currentUser();
    this.name = u?.name ?? '';
    this.lastName = u?.lastName ?? '';
    this.userName = u?.userName ?? '';
    this.password = u?.password ?? '';
    this.editMode.set(true);
    this.saveSuccess.set(false);
    this.saveError.set('');
  }

  saveProfile() {
    if (!this.name.trim() || !this.userName.trim()) {
      this.saveError.set('Nombre y usuario son requeridos.');
      return;
    }
    const userId = this.auth.currentUser()?.id;
    if (!userId) return;
    this.saving.set(true);
    this.saveError.set('');

    this.userService.update(userId, {
      id: userId,
      name: this.name,
      lastName: this.lastName,
      userName: this.userName,
      password: this.password,
    }).subscribe({
      next: (updated) => {
        this.auth.login(updated);
        this.editMode.set(false);
        this.saveSuccess.set(true);
        this.saving.set(false);
      },
      error: () => { this.saveError.set('Error al guardar perfil.'); this.saving.set(false); },
    });
  }
}

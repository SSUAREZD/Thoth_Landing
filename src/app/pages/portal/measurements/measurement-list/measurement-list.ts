import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { AuthService } from '../../../../core/services/auth.service';
import { MeasurementDTO } from '../../../../core/models/models';

@Component({
  selector: 'app-measurement-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './measurement-list.html',
  styleUrl: './measurement-list.css',
})
export class MeasurementListComponent implements OnInit {
  private userService = inject(UserService);
  auth = inject(AuthService);

  measurements = signal<MeasurementDTO[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');

  ngOnInit() { this.load(); }

  load() {
    const userId = this.auth.currentUser()?.id;
    if (!userId) return;
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.userService.getMeasurements(userId).subscribe({
      next: (data) => { this.measurements.set(data); this.isLoading.set(false); },
      error: () => { this.errorMessage.set('Error al cargar medidas.'); this.isLoading.set(false); },
    });
  }
}

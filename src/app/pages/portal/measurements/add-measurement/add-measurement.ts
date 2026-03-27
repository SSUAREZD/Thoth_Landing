import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MeasurementService } from '../../../../core/services/measurement.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-add-measurement',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-measurement.html',
  styleUrl: './add-measurement.css',
})
export class AddMeasurementComponent {
  private measurementService = inject(MeasurementService);
  private auth = inject(AuthService);
  private router = inject(Router);

  bodyPart = 'FEET';
  units = 'CENTIMETER';
  side = 'LEFT';
  footLength = '';
  footWidth = '';
  instepGirth = '';
  ballGirth = '';

  isLoading = signal(false);
  errorMessage = signal('');

  unitOptions = ['CENTIMETER', 'INCHES', 'MILLIMETERS'];
  sideOptions = ['LEFT', 'RIGHT'];

  onSubmit() {
    const fl = parseFloat(this.footLength);
    const fw = parseFloat(this.footWidth);
    const ig = parseFloat(this.instepGirth);
    const bg = parseFloat(this.ballGirth);

    if (isNaN(fl) || isNaN(fw) || isNaN(ig) || isNaN(bg)) {
      this.errorMessage.set('Todos los valores deben ser números válidos.');
      return;
    }

    const userId = this.auth.currentUser()?.id;
    if (!userId) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.measurementService.createFeetMeasurement(userId, {
      id: '',
      bodyPart: this.bodyPart,
      units: this.units,
      side: this.side,
      userId,
      measurementType: 'FEET',
      footLength: fl,
      footWidth: fw,
      instepGirth: ig,
      ballGirth: bg,
    }).subscribe({
      next: () => this.router.navigate(['/app/measurements']),
      error: () => { this.errorMessage.set('Error al guardar medida.'); this.isLoading.set(false); },
    });
  }
}

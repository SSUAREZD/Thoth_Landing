import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PhoneService } from '../../../../core/services/phone.service';
import { PhoneDTO } from '../../../../core/models/models';

@Component({
  selector: 'app-edit-phone',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './edit-phone.html',
  styleUrl: './edit-phone.css',
})
export class EditPhoneComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private phoneService = inject(PhoneService);
  private router = inject(Router);

  phoneId = '';
  original: PhoneDTO | null = null;

  name = '';
  length = '';
  width = '';
  gyroCamera = '';
  gyroBelow = '';

  isLoading = signal(false);
  loadError = signal('');
  saveError = signal('');

  ngOnInit() {
    this.phoneId = this.route.snapshot.paramMap.get('id') ?? '';
    this.phoneService.getById(this.phoneId).subscribe({
      next: (p) => {
        this.original = p;
        this.name = p.name;
        this.length = String(p.length);
        this.width = String(p.width);
        this.gyroCamera = String(p.gyroscopeDistanceToCamera);
        this.gyroBelow = String(p.gyroscopeDistanceToBelow);
      },
      error: () => this.loadError.set('Error al cargar teléfono.'),
    });
  }

  onSubmit() {
    if (!this.name.trim()) { this.saveError.set('El nombre es requerido.'); return; }
    const l = parseFloat(this.length);
    const w = parseFloat(this.width);
    const gc = parseFloat(this.gyroCamera);
    const gb = parseFloat(this.gyroBelow);
    if (isNaN(l) || isNaN(w) || isNaN(gc) || isNaN(gb)) {
      this.saveError.set('Todos los valores numéricos deben ser válidos.');
      return;
    }
    this.isLoading.set(true);
    this.saveError.set('');
    this.phoneService.update(this.phoneId, { ...this.original!, name: this.name, length: l, width: w, gyroscopeDistanceToCamera: gc, gyroscopeDistanceToBelow: gb }).subscribe({
      next: () => this.router.navigate(['/app/phones', this.phoneId]),
      error: () => { this.saveError.set('Error al guardar cambios.'); this.isLoading.set(false); },
    });
  }
}

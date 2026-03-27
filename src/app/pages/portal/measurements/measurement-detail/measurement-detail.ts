import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { MeasurementService } from '../../../../core/services/measurement.service';
import { FeetMeasurementDTO } from '../../../../core/models/models';

@Component({
  selector: 'app-measurement-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './measurement-detail.html',
  styleUrl: './measurement-detail.css',
})
export class MeasurementDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private measurementService = inject(MeasurementService);

  measurement = signal<FeetMeasurementDTO | null>(null);
  isLoading = signal(true);
  errorMessage = signal('');

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.measurementService.getById(id).subscribe({
      next: (m) => { this.measurement.set(m as FeetMeasurementDTO); this.isLoading.set(false); },
      error: () => { this.errorMessage.set('Error al cargar medida.'); this.isLoading.set(false); },
    });
  }
}

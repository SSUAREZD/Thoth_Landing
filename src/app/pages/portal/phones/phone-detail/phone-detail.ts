import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { PhoneService } from '../../../../core/services/phone.service';
import { PhoneDTO } from '../../../../core/models/models';

@Component({
  selector: 'app-phone-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './phone-detail.html',
  styleUrl: './phone-detail.css',
})
export class PhoneDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private phoneService = inject(PhoneService);

  phoneId = '';
  phone = signal<PhoneDTO | null>(null);
  isLoading = signal(true);
  errorMessage = signal('');

  ngOnInit() {
    this.phoneId = this.route.snapshot.paramMap.get('id') ?? '';
    this.phoneService.getById(this.phoneId).subscribe({
      next: (p) => { this.phone.set(p); this.isLoading.set(false); },
      error: () => { this.errorMessage.set('Error al cargar teléfono.'); this.isLoading.set(false); },
    });
  }
}

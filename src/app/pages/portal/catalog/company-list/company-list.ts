import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../../../core/services/company.service';
import { CompanyDTO } from '../../../../core/models/models';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './company-list.html',
  styleUrl: './company-list.css',
})
export class CompanyListComponent implements OnInit {
  private companyService = inject(CompanyService);

  companies = signal<CompanyDTO[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');
  search = '';

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.companyService.getAll().subscribe({
      next: (data) => { this.companies.set(data); this.isLoading.set(false); },
      error: () => { this.errorMessage.set('Error al cargar marcas.'); this.isLoading.set(false); },
    });
  }

  get filtered(): CompanyDTO[] {
    const q = this.search.toLowerCase();
    return this.companies().filter(c => c.name.toLowerCase().includes(q));
  }
}

import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ProductLineService } from '../../../../core/services/product-line.service';
import { CompanyService } from '../../../../core/services/company.service';
import { ProductLineDTO, CompanyDTO } from '../../../../core/models/models';

@Component({
  selector: 'app-product-line-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-line-list.html',
  styleUrl: './product-line-list.css',
})
export class ProductLineListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productLineService = inject(ProductLineService);
  private companyService = inject(CompanyService);

  companyId = signal('');
  company = signal<CompanyDTO | null>(null);
  productLines = signal<ProductLineDTO[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('companyId') ?? '';
    this.companyId.set(id);
    this.companyService.getById(id).subscribe({ next: c => this.company.set(c) });
    this.load();
  }

  load() {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.productLineService.getByCompany(this.companyId()).subscribe({
      next: (data) => { this.productLines.set(data); this.isLoading.set(false); },
      error: () => { this.errorMessage.set('Error al cargar líneas.'); this.isLoading.set(false); },
    });
  }
}

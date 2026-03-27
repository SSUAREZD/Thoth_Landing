import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { RecommendationService } from '../../../../core/services/recommendation.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ProductDTO, SizeDTO } from '../../../../core/models/models';

type RecoState = 'idle' | 'loading' | 'noMeasurements' | 'noMatch' | 'result' | 'error';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private recommendationService = inject(RecommendationService);
  auth = inject(AuthService);

  companyId = '';
  lineId = '';
  productId = '';

  product = signal<ProductDTO | null>(null);
  isLoading = signal(true);
  errorMessage = signal('');

  recoState = signal<RecoState>('idle');
  recommendedSize = signal<SizeDTO | null>(null);

  editMode = signal(false);
  editName = '';
  editSize = '';
  saving = signal(false);
  saveError = signal('');

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('companyId') ?? '';
    this.lineId = this.route.snapshot.paramMap.get('lineId') ?? '';
    this.productId = this.route.snapshot.paramMap.get('productId') ?? '';
    this.loadProduct();
  }

  loadProduct() {
    this.isLoading.set(true);
    this.productService.getById(this.productId).subscribe({
      next: (p) => {
        this.product.set(p);
        this.editName = p.name;
        this.editSize = p.size ?? '';
        this.isLoading.set(false);
        this.loadRecommendation();
      },
      error: () => { this.errorMessage.set('Error al cargar producto.'); this.isLoading.set(false); },
    });
  }

  loadRecommendation() {
    const userId = this.auth.currentUser()?.id;
    if (!userId) return;
    this.recoState.set('loading');
    this.recommendationService.getRecommendation(userId, this.productId).subscribe({
      next: (size) => {
        if (!size) {
          this.recoState.set('noMeasurements');
        } else if (size.id === '-1' || size.id === -1) {
          this.recoState.set('noMatch');
        } else {
          this.recommendedSize.set(size);
          this.recoState.set('result');
        }
      },
      error: () => this.recoState.set('error'),
    });
  }

  saveEdit() {
    if (!this.editName.trim()) return;
    this.saving.set(true);
    this.saveError.set('');
    const p = this.product()!;
    this.productService.update(this.productId, { ...p, name: this.editName, size: this.editSize }).subscribe({
      next: (updated) => {
        this.product.set(updated);
        this.editMode.set(false);
        this.saving.set(false);
      },
      error: () => { this.saveError.set('Error al guardar cambios.'); this.saving.set(false); },
    });
  }
}

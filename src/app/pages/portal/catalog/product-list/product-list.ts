import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { ProductLineService } from '../../../../core/services/product-line.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ProductDTO, ProductLineDTO } from '../../../../core/models/models';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private productLineService = inject(ProductLineService);
  auth = inject(AuthService);

  companyId = '';
  lineId = '';
  productLine = signal<ProductLineDTO | null>(null);
  products = signal<ProductDTO[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');
  savingLine = signal(false);
  savedLine = signal(false);
  saveError = signal('');

  showAddForm = signal(false);
  newProductName = '';
  newProductSize = '';
  addingProduct = signal(false);
  addError = signal('');

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('companyId') ?? '';
    this.lineId = this.route.snapshot.paramMap.get('lineId') ?? '';
    this.productLineService.getById(this.lineId).subscribe({ next: l => this.productLine.set(l) });
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.productService.getByProductLine(this.lineId).subscribe({
      next: (data) => { this.products.set(data); this.isLoading.set(false); },
      error: () => { this.errorMessage.set('Error al cargar productos.'); this.isLoading.set(false); },
    });
  }

  saveToMyLines() {
    const userId = this.auth.currentUser()?.id;
    if (!userId) return;
    this.savingLine.set(true);
    this.saveError.set('');
    this.productLineService.addToUser(userId, this.lineId).subscribe({
      next: () => { this.savedLine.set(true); this.savingLine.set(false); },
      error: () => { this.saveError.set('Error al guardar línea.'); this.savingLine.set(false); },
    });
  }

  deleteProduct(id: string | number, event: Event) {
    event.preventDefault();
    if (!confirm('¿Eliminar este producto?')) return;
    this.productService.delete(id).subscribe({
      next: () => this.products.update(list => list.filter(p => p.id !== id)),
      error: () => alert('Error al eliminar producto.'),
    });
  }

  addProduct() {
    if (!this.newProductName.trim() || !this.newProductSize.trim()) {
      this.addError.set('Nombre y talla son requeridos.');
      return;
    }
    this.addingProduct.set(true);
    this.addError.set('');
    this.productService.create({
      name: this.newProductName,
      size: this.newProductSize,
      productLineId: this.lineId,
    }).subscribe({
      next: (p) => {
        this.products.update(list => [...list, p]);
        this.newProductName = '';
        this.newProductSize = '';
        this.showAddForm.set(false);
        this.addingProduct.set(false);
      },
      error: () => { this.addError.set('Error al crear producto.'); this.addingProduct.set(false); },
    });
  }
}

import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductLineService } from '../../../core/services/product-line.service';
import { AuthService } from '../../../core/services/auth.service';
import { ProductLineDTO } from '../../../core/models/models';

@Component({
  selector: 'app-my-lines',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './my-lines.html',
  styleUrl: './my-lines.css',
})
export class MyLinesComponent implements OnInit {
  private productLineService = inject(ProductLineService);
  auth = inject(AuthService);

  lines = signal<ProductLineDTO[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');
  search = '';

  ngOnInit() { this.load(); }

  load() {
    const userId = this.auth.currentUser()?.id;
    if (!userId) return;
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.productLineService.getByUser(userId).subscribe({
      next: (data) => { this.lines.set(data); this.isLoading.set(false); },
      error: () => { this.errorMessage.set('Error al cargar tus líneas.'); this.isLoading.set(false); },
    });
  }

  get filtered(): ProductLineDTO[] {
    const q = this.search.toLowerCase();
    return this.lines().filter(l => l.name.toLowerCase().includes(q));
  }
}

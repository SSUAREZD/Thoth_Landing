import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductLineDTO } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ProductLineService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/product-lines`;

  getAll(): Observable<ProductLineDTO[]> {
    return this.http.get<ProductLineDTO[]>(this.baseUrl);
  }

  getById(id: string | number): Observable<ProductLineDTO> {
    return this.http.get<ProductLineDTO>(`${this.baseUrl}/${id}`);
  }

  getByCompany(companyId: string | number): Observable<ProductLineDTO[]> {
    return this.http.get<ProductLineDTO[]>(`${this.baseUrl}/company/${companyId}`);
  }

  getByUser(userId: string | number): Observable<ProductLineDTO[]> {
    return this.http.get<ProductLineDTO[]>(`${this.baseUrl}/user/${userId}`);
  }

  addToUser(userId: string | number, productLineId: string | number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/user/${userId}/${productLineId}`, {});
  }

  create(productLine: ProductLineDTO): Observable<ProductLineDTO> {
    return this.http.post<ProductLineDTO>(this.baseUrl, productLine);
  }

  update(id: string | number, productLine: ProductLineDTO): Observable<ProductLineDTO> {
    return this.http.put<ProductLineDTO>(`${this.baseUrl}/${id}`, productLine);
  }

  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

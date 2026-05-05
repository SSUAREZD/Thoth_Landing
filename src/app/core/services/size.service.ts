import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SizeDTO } from '../models/models';

@Injectable({ providedIn: 'root' })
export class SizeService {
  private http = inject(HttpClient);
  private get baseUrl() { return `${environment.getApiUrl()}/sizes`; }

  getAll(): Observable<SizeDTO[]> {
    return this.http.get<SizeDTO[]>(this.baseUrl);
  }

  getById(id: string | number): Observable<SizeDTO> {
    return this.http.get<SizeDTO>(`${this.baseUrl}/${id}`);
  }

  create(size: SizeDTO): Observable<SizeDTO> {
    return this.http.post<SizeDTO>(this.baseUrl, size);
  }

  update(id: string | number, size: SizeDTO): Observable<SizeDTO> {
    return this.http.put<SizeDTO>(`${this.baseUrl}/${id}`, size);
  }

  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

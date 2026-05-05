import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CompanyDTO } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private http = inject(HttpClient);

  private get baseUrl() {
    return `${environment.getApiUrl()}/companies`;
  }

  getAll(): Observable<CompanyDTO[]> {
    return this.http.get<CompanyDTO[]>(this.baseUrl);
  }

  getById(id: string | number): Observable<CompanyDTO> {
    return this.http.get<CompanyDTO>(`${this.baseUrl}/${id}`);
  }

  create(company: CompanyDTO): Observable<CompanyDTO> {
    return this.http.post<CompanyDTO>(this.baseUrl, company);
  }

  update(id: string | number, company: CompanyDTO): Observable<CompanyDTO> {
    return this.http.put<CompanyDTO>(`${this.baseUrl}/${id}`, company);
  }

  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

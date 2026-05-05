import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PhoneDTO, CreatePhoneRequest } from '../models/models';

@Injectable({ providedIn: 'root' })
export class PhoneService {
  private http = inject(HttpClient);
  private get baseUrl() { return `${environment.getApiUrl()}/phones`; }

  getAll(): Observable<PhoneDTO[]> {
    return this.http.get<PhoneDTO[]>(this.baseUrl);
  }

  getById(id: string | number): Observable<PhoneDTO> {
    return this.http.get<PhoneDTO>(`${this.baseUrl}/${id}`);
  }

  getByUser(userId: string | number): Observable<PhoneDTO[]> {
    return this.http.get<PhoneDTO[]>(`${this.baseUrl}/user/${userId}`);
  }

  create(phone: CreatePhoneRequest): Observable<PhoneDTO> {
    return this.http.post<PhoneDTO>(this.baseUrl, phone);
  }

  update(id: string | number, phone: PhoneDTO): Observable<PhoneDTO> {
    return this.http.put<PhoneDTO>(`${this.baseUrl}/${id}`, phone);
  }

  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

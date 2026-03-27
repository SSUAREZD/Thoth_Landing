import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserDTO, PhoneDTO, MeasurementDTO, CreateUserRequest } from '../models/models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/users`;

  getAll(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.baseUrl);
  }

  getById(id: string | number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.baseUrl}/${id}`);
  }

  getPhones(id: string | number): Observable<PhoneDTO[]> {
    return this.http.get<PhoneDTO[]>(`${this.baseUrl}/${id}/phones`);
  }

  getMeasurements(userId: string | number): Observable<MeasurementDTO[]> {
    return this.http.get<MeasurementDTO[]>(`${this.baseUrl}/measurements/${userId}`);
  }

  create(user: CreateUserRequest): Observable<UserDTO> {
    return this.http.post<UserDTO>(this.baseUrl, user);
  }

  update(id: string | number, user: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${this.baseUrl}/${id}`, user);
  }

  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

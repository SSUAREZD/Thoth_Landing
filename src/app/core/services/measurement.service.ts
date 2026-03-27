import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MeasurementDTO, FeetMeasurementDTO } from '../models/models';

@Injectable({ providedIn: 'root' })
export class MeasurementService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/measurements`;

  getAll(): Observable<MeasurementDTO[]> {
    return this.http.get<MeasurementDTO[]>(this.baseUrl);
  }

  getById(id: string | number): Observable<MeasurementDTO> {
    return this.http.get<MeasurementDTO>(`${this.baseUrl}/${id}`);
  }

  createFeetMeasurement(userId: string | number, measurement: FeetMeasurementDTO): Observable<FeetMeasurementDTO> {
    return this.http.post<FeetMeasurementDTO>(
      `${this.baseUrl}/feet?userId=${userId}`,
      measurement
    );
  }

  update(id: string | number, measurement: FeetMeasurementDTO): Observable<MeasurementDTO> {
    return this.http.put<MeasurementDTO>(`${this.baseUrl}/${id}`, measurement);
  }

  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

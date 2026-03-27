import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SizeDTO } from '../models/models';

@Injectable({ providedIn: 'root' })
export class RecommendationService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/recommendations`;

  /**
   * Returns the recommended size for a user-product pair.
   * Response { id: "-1", denomination: "-1" } means no fit found.
   * null response (HTTP 204) means no measurement data available.
   */
  getRecommendation(userId: string | number, productId: string | number): Observable<SizeDTO | null> {
    return this.http.get<SizeDTO | null>(
      `${this.baseUrl}/user/${userId}/product/${productId}`
    );
  }
}

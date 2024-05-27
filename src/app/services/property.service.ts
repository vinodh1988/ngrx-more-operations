import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Property } from '../models/property';
import { HistoricalPrice } from '../models/historicaldata';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  public baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.baseUrl}/properties`);
  }

  getHistoricalPrices(propertyId: number): Observable<number[]> {
    return this.http.get<HistoricalPrice[]>(`${this.baseUrl}/historicalPrices?propertyId=${propertyId}`).pipe(
      map(response => {
            return (response.length > 0 && response[0].prices) ? response[0].prices:[]
      })
    );
  }
}

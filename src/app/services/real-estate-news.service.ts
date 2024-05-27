import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { News } from '../models/news';


@Injectable({
  providedIn: 'root',
})
export class RealEstateNewsService {
baseUrl = 'http://localhost:3000/news';

  constructor(private http: HttpClient) {}

  getNews(propertyId: number): Observable<string[]> {
    return this.http.get<News[]>(`${this.baseUrl}?propertyId=${propertyId}`).pipe(
      map(response => {
        if (response.length > 0 && response[0].articles) {
          return response[0].articles;
        } else {
 
          return [];
        }
      })
    );
  }
}

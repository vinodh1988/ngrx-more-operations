import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError, forkJoin } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { PropertyEffects } from '../ngrx/effects/property.effects';
import { PropertyService } from '../services/property.service';
import { RealEstateNewsService } from '../services/real-estate-news.service';
import { loadProperties, loadPropertiesSuccess, loadPropertiesFailure } from '../ngrx/actions/property.actions';
import { Property } from '../models/property';

describe('PropertyEffects', () => {
  let effects: PropertyEffects;
  let actions$: Observable<Action>;
  let propertyService: jest.Mocked<PropertyService>;
  let newsService: jest.Mocked<RealEstateNewsService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PropertyEffects,
        provideMockActions(() => actions$),
        { provide: PropertyService, useValue: { getProperties: jest.fn(), getHistoricalPrices: jest.fn() } },
        { provide: RealEstateNewsService, useValue: { getNews: jest.fn() } }
      ]
    });

    effects = TestBed.inject(PropertyEffects);
    propertyService = TestBed.inject(PropertyService) as jest.Mocked<PropertyService>;
    newsService = TestBed.inject(RealEstateNewsService) as jest.Mocked<RealEstateNewsService>;

  });

  it('should handle successful properties load with historical data and news', () => {
    const properties: Property[] = [
      { id: 1, name: 'Luxury Villa', location: 'Beverly Hills', price: 2500000 },
      { id: 2, name: 'Urban Flat', location: 'San Francisco', price: 1500000 }
    ];
    const histories = [[500000, 1500000, 2000000], [800000, 1200000]];
    const newsData = [["News 1", "News 2"], ["News 3"]];

    propertyService.getProperties.mockReturnValue(of(properties));
    propertyService.getHistoricalPrices.mockImplementation(id =>
      of(histories[properties.findIndex(p => p.id === id)])
    );
    newsService.getNews.mockImplementation(id =>
      of(newsData[properties.findIndex(p => p.id === id)])
    );

    actions$ = of(loadProperties());
    const expectedResult = properties.map((prop, index) => ({
      ...prop,
      history: histories[index],
      news: newsData[index]
    }));

    effects.loadProperties$.subscribe(result => {
      expect(result).toEqual(loadPropertiesSuccess({ properties: expectedResult }));
    });
  });

  it('should handle failure when property service fails', () => {
    const error = new Error('API Error');
    propertyService.getProperties.mockReturnValue(throwError(() => error));

    actions$ = of(loadProperties());

    effects.loadProperties$.subscribe(result => {
      expect(result).toEqual(loadPropertiesFailure({ error }));
    });
  });

  it('should handle failure when loading historical prices or news fails', () => {
    const properties: Property[] = [{ id: 1, name: 'Luxury Villa', location: 'Beverly Hills', price: 2500000 }];
    const error = new Error('API Error on sub-call');
    propertyService.getProperties.mockReturnValue(of(properties));
    propertyService.getHistoricalPrices.mockReturnValue(throwError(() => error));

    actions$ = of(loadProperties());

    effects.loadProperties$.subscribe(result => {
      expect(result).toEqual(loadPropertiesFailure({ error }));
    });
  });
});

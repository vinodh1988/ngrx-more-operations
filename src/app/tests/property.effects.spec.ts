import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';

import { PropertyEffects } from '../ngrx/effects/property.effects';
import { PropertyService } from '../services/property.service';
import { loadProperties, loadPropertiesSuccess, loadPropertiesFailure } from '../ngrx/actions/property.actions';
import { Property } from '../models/property';

describe('PropertyEffects', () => {
  let effects: PropertyEffects;
  let actions$: Observable<Action>;
  let propertyService: jest.Mocked<PropertyService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PropertyEffects,
        provideMockActions(() => actions$),
        { provide: PropertyService, useValue: { getProperties: jest.fn() } }
      ]
    });

    effects = TestBed.inject(PropertyEffects);
    propertyService = TestBed.inject(PropertyService) as jest.Mocked<PropertyService>;
  });

  it('should emit a loadPropertiesSuccess action when getProperties is successful', () => {
    const properties: Property[] = [
      { id: 1, name: 'Luxury Villa', location: 'Beverly Hills', price: 2500000 },
      { id: 2, name: 'Country House', location: 'Nashville', price: 850000 }
    ];
    const action = loadProperties();
    const outcome = loadPropertiesSuccess({ properties });

    actions$ = of(action);
    propertyService.getProperties.mockReturnValue(of(properties));

    effects.loadProperties$.subscribe(result => {
      expect(result).toEqual(outcome);
      expect(propertyService.getProperties).toHaveBeenCalled();
    });
  });

  it('should emit a loadPropertiesFailure action when getProperties fails', () => {
    const error = new Error('Network error');
    const action = loadProperties();
    const outcome = loadPropertiesFailure({ error });

    actions$ = of(action);
    propertyService.getProperties.mockReturnValue(throwError(() => error));

    effects.loadProperties$.subscribe(result => {
      expect(result).toEqual(outcome);
      expect(result.type).toBe('[Property API] Load Properties Failure');
      expect(propertyService.getProperties).toHaveBeenCalled();
    });
  });
});

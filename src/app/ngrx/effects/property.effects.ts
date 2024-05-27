import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of, forkJoin } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { PropertyService } from '../../services/property.service';
import { RealEstateNewsService } from '../../services/real-estate-news.service';
import { loadProperties, loadPropertiesSuccess, loadPropertiesFailure } from '../actions/property.actions';
import { Property } from '../../models/property';

@Injectable()
export class PropertyEffects {
  loadProperties$ = createEffect(() => this.actions$.pipe(
    ofType(loadProperties),
    switchMap(() => this.propertyService.getProperties().pipe(
      mergeMap(properties => forkJoin(
        properties.map(property => forkJoin({
          property: of(property),
          history: this.propertyService.getHistoricalPrices(property.id),
          news: this.realEstateNewsService.getNews(property.id)
        }).pipe(
          map(({ property, history, news }) => ({
            ...property,
            history,
            news
          }))
        ))
      ).pipe(
        map(propertiesWithDetails => loadPropertiesSuccess({ properties: propertiesWithDetails })),
        catchError(error => of(loadPropertiesFailure({ error })))
      )),
      catchError(error => of(loadPropertiesFailure({ error })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private propertyService: PropertyService,
    private realEstateNewsService: RealEstateNewsService
  ) {}
}

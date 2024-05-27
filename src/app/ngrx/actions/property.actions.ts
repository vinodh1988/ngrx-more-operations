import { createAction, props } from '@ngrx/store';
import { Property } from '../../models/property';


export const loadProperties = createAction(
  '[Property Component] Load Properties'
);

export const loadPropertiesSuccess = createAction(
  '[Property API] Load Properties Success',
  props<{ properties: Property[] }>()
);

export const loadPropertiesFailure = createAction(
  '[Property API] Load Properties Failure',
  props<{ error: any }>()
);

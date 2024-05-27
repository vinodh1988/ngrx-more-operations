import { createReducer, on } from '@ngrx/store';
import { Property } from '../../models/property';
import { loadPropertiesSuccess, loadPropertiesFailure } from '../actions/property.actions'

export interface PropertyState {
  properties: Property[];
  error: any; 
}
export const initialState: PropertyState = {
  properties: [],
  error: null
};

export const propertyReducer = createReducer(
    initialState,
    on(loadPropertiesSuccess, (state, { properties }) => ({
      ...state,
      properties: properties,
      error: null 
    })),
    on(loadPropertiesFailure, (state, { error }) => ({
      ...state,
      properties: [],  
      error: error     
    }))
  );
  
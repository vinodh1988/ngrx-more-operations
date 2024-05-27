import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PropertyState } from '../reducers/property.reducers';

// Selector to access the entire property feature state
export const selectPropertyState = createFeatureSelector<PropertyState>('property');

// Selector to get all properties from the state
export const selectAllProperties = createSelector(
  selectPropertyState,
  (state: PropertyState) => state.properties
);

// Selector to get the current error state
export const selectPropertyError = createSelector(
  selectPropertyState,
  (state: PropertyState) => state.error
);

import { Property } from '../models/property';
import { selectAllProperties, selectPropertyError, selectPropertyState } from '../ngrx/selectors/property.selectors';
import { PropertyState } from '../ngrx/reducers/property.reducers';

describe('Property Selectors', () => {
  const initialState: PropertyState = {
    properties: [
      { id: 1, name: 'Luxury Villa', location: 'Beverly Hills', price: 2500000 },
      { id: 2, name: 'Country House', location: 'Nashville', price: 850000 }
    ],
    error: null
  };

  it('should select the property state', () => {
    const result = selectPropertyState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select all properties', () => {
    const result = selectAllProperties.projector(initialState);
    expect(result.length).toBe(2);
    expect(result).toEqual(initialState.properties);
  });

  it('should select the property error', () => {
    const modifiedState = { ...initialState, error: 'Network Error' };
    const result = selectPropertyError.projector(modifiedState);
    expect(result).toBe('Network Error');
  });
});

import { propertyReducer, initialState, PropertyState } from '../ngrx/reducers/property.reducers';
import { loadPropertiesSuccess, loadPropertiesFailure } from '../ngrx/actions/property.actions';
import { Property } from '../models/property';

describe('PropertyReducer', () => {
  it('should return the initial state', () => {
    const action = { type: 'UNKNOWN' } as any;
    const state = propertyReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should update properties on loadPropertiesSuccess', () => {
    const testData: Property[] = [
      { id: 1, name: 'Luxury Villa', location: 'Beverly Hills', price: 2500000 },
      { id: 2, name: 'Urban Flat', location: 'San Francisco', price: 1500000 }
    ];
    const action = loadPropertiesSuccess({ properties: testData });
    const result = propertyReducer(initialState, action);

    expect(result.properties.length).toBe(2);
    expect(result.properties).toEqual(testData);
    expect(result.error).toBeNull();
  });

  it('should update error on loadPropertiesFailure', () => {
    const error = 'Unable to fetch properties';
    const action = loadPropertiesFailure({ error });
    const result = propertyReducer(initialState, action);

    expect(result.properties.length).toEqual(0);
    expect(result.error).toBe(error);
  });
});

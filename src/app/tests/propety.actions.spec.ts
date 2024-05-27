import * as PropertyActions from '../ngrx/actions/property.actions';
import { Property } from '../models/property';

describe('Property Actions', () => {
  describe('loadProperties', () => {
    it('should create an action', () => {
      const action = PropertyActions.loadProperties();
      expect(action.type).toEqual('[Property Component] Load Properties');
    });
  });

  describe('loadPropertiesSuccess', () => {
    it('should create a success action with payload', () => {
      const payload: Property[] = [
        { id: 1, name: 'Luxury Villa', location: 'Beverly Hills', price: 2500000 },
        { id: 2, name: 'Country House', location: 'Nashville', price: 850000 }
      ];
      const action = PropertyActions.loadPropertiesSuccess({ properties: payload });
      expect(action.type).toEqual('[Property API] Load Properties Success');
      expect(action.properties).toEqual(payload);
    });
  });

  describe('loadPropertiesFailure', () => {
    it('should create a failure action with payload', () => {
      const payload = { error: 'Error' };
      const action = PropertyActions.loadPropertiesFailure({ error: payload.error });
      expect(action.type).toEqual('[Property API] Load Properties Failure');
      expect(action.error).toEqual(payload.error);
    });
  });
});

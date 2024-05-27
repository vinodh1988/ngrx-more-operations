import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property';
import { HistoricalPrice } from '../models/historicaldata';

describe('PropertyService', () => {
  let service: PropertyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PropertyService]
    });
    service = TestBed.inject(PropertyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Test for getProperties method
  it('should fetch properties successfully', () => {
    const dummyProperties: Property[] = [
      { id: 1, name: 'Luxury Villa', location: 'Beverly Hills', price: 2500000 },
      { id: 2, name: 'Country House', location: 'Nashville', price: 850000 }
    ];

    service.getProperties().subscribe(properties => {
      expect(properties.length).toBe(2);
      expect(properties).toEqual(dummyProperties);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/properties`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProperties);
  });

  it('should handle empty response when fetching properties', () => {
    service.getProperties().subscribe(properties => {
      expect(properties.length).toBe(0);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/properties`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  // Test for getHistoricalPrices method
  it('should fetch historical prices successfully', () => {
    const propertyId = 1;
    const dummyHistoricalPrices: HistoricalPrice[] = [{ propertyId: 1, prices: [100000, 200000] }];

    service.getHistoricalPrices(propertyId).subscribe(prices => {
      expect(prices).toEqual([100000, 200000]);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/historicalPrices?propertyId=${propertyId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyHistoricalPrices);
  });

  it('should return an empty array if no historical prices are found', () => {
    const propertyId = 1;
    service.getHistoricalPrices(propertyId).subscribe(prices => {
      expect(prices).toEqual([]);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/historicalPrices?propertyId=${propertyId}`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should handle malformed data by returning an empty array', () => {
    const propertyId = 1;
    const malformedData = [{ propertyId: 1 }]; // Missing 'prices' key

    service.getHistoricalPrices(propertyId).subscribe(prices => {
      expect(prices).toEqual([]);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/historicalPrices?propertyId=${propertyId}`);
    expect(req.request.method).toBe('GET');
    req.flush(malformedData);
  });
});

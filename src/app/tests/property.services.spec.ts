import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property';
import { HttpErrorResponse } from '@angular/common/http';

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

  it('should fetch properties via GET', () => {
    const dummyProperties: Property[] = [{ id: 1, name: 'Test Property' ,price: 20.0, history:[],news:[],location:"Dummy"}];
    service.getProperties().subscribe(properties => {
      expect(properties).toEqual(dummyProperties);
    });

    const request = httpMock.expectOne(`${service.baseUrl}/properties`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyProperties);
  });

  it('should handle the network error for the getProperties call', () => {
    const emsg = 'simulated network error';
    service.getProperties().subscribe({
      next: () => fail('should have failed with the network error'),
      error: (error: HttpErrorResponse) => {
        expect(error.error.message).toContain(emsg);
      }
    }
    );

    const req = httpMock.expectOne(`${service.baseUrl}/properties`);
    expect(req.request.method).toBe('GET');
    req.flush({message: emsg}, {status: 500, statusText: 'Internal Server Error'});
  });

});

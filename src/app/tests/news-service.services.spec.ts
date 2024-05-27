import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RealEstateNewsService } from '../services/real-estate-news.service';

describe('RealEstateNewsService', () => {
  let service: RealEstateNewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RealEstateNewsService]
    });
    service = TestBed.inject(RealEstateNewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding.
  });

 
  it('should fetch news articles successfully', () => {
    const dummyNews = [
      'New park opens nearby, property values climbing',
      'Ocean View Condo area sees 5% property value increase'
    ];
    const propertyId = 1;

    service.getNews(propertyId).subscribe(news => {
      expect(news.length).toBe(2);
      expect(news).toEqual(dummyNews);
    });

    const req = httpMock.expectOne(`${service.baseUrl}?propertyId=${propertyId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyNews);
  });

  it('should handle errors when the network fails', () => {
    const propertyId = 1;
    const emsg = 'simulated network error';

    service.getNews(propertyId).subscribe(
      () => fail('should have failed with the network error'),
      (error: Error) => {
        expect(error.message).toContain(emsg);
      }
    );

    const req = httpMock.expectOne(`${service.baseUrl}?propertyId=${propertyId}`);
    req.flush({message: emsg}, { status: 500, statusText: 'Server Error' });
  });
});

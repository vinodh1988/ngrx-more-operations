import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RealEstateNewsService } from '../services/real-estate-news.service';
import { News } from '../models/news';

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
    httpMock.verify();
  });

  it('should return articles when there are articles available', () => {
    const dummyNews: News[] = [
      { propertyId: 1, articles: ['Article 1', 'Article 2'] }
    ];

    service.getNews(1).subscribe(articles => {
      expect(articles).toEqual(['Article 1', 'Article 2']);
    });

    const req = httpMock.expectOne(`${service.baseUrl}?propertyId=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyNews);
  });

  it('should return an empty array when no articles are available', () => {
    const emptyNews: News[] = [];

    service.getNews(1).subscribe(articles => {
      expect(articles).toEqual([]);
    });

    const req = httpMock.expectOne(`${service.baseUrl}?propertyId=1`);
    expect(req.request.method).toBe('GET');
    req.flush(emptyNews);
  });

  it('should handle malformed data by returning an empty array', () => {
    const malformedData = [{ propertyId: 1 }]; 

    service.getNews(1).subscribe(articles => {
      expect(articles).toEqual([]);
    });

    const req = httpMock.expectOne(`${service.baseUrl}?propertyId=1`);
    expect(req.request.method).toBe('GET');
    req.flush(malformedData);
  });
});

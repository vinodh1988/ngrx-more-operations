import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyListComponent } from '../components/property-list/property-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { loadProperties } from '../ngrx/actions/property.actions';
import { selectAllProperties, selectPropertyError } from '../ngrx/selectors/property.selectors';

describe('PropertyListComponent', () => {
  let component: PropertyListComponent;
  let fixture: ComponentFixture<PropertyListComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyListComponent],
      providers: [provideMockStore({
        selectors: [
          { selector: selectAllProperties, value: [] },
          { selector: selectPropertyError, value: 'Error' }
        ]
      })]
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should dispatch loadProperties on init', () => {
    const spy = jest.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(loadProperties());
  });

  it('should display an error message if there is an error', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.error').textContent).toContain('Error');
  });
});

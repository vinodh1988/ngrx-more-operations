import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Property } from '../../models/property';
import { loadProperties } from '../../ngrx/actions/property.actions';
import { selectAllProperties, selectPropertyError } from '../../ngrx/selectors/property.selectors';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  properties$: Observable<Property[]>;
  error$: Observable<any>;

  constructor(private store: Store) {
    this.properties$ = this.store.select(selectAllProperties);
    this.error$ = this.store.select(selectPropertyError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadProperties());
  }
}

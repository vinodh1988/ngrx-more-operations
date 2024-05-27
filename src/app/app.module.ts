import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { propertyReducer } from './ngrx/reducers/property.reducers';
import { PropertyEffects } from './ngrx/effects/property.effects';
import { PropertyListComponent } from './components/property-list/property-list.component';


@NgModule({
  declarations: [
    AppComponent,
    PropertyListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      property: propertyReducer // Ensure that 'property' matches the key used in the selector
    }),
    EffectsModule.forRoot([
      PropertyEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    // Restrict extension to log-only mode in production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

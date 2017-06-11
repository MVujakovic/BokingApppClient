import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { RegionComponent } from './region/region.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    RegionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

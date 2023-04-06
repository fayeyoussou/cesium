import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CesiumDirective } from './dir/cesium.directive';
import { CesiumMapComponent } from './cesium-map/cesium-map.component';

@NgModule({
  declarations: [
    AppComponent,
    CesiumDirective,
    CesiumMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

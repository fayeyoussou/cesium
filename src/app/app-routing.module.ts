import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CesiumMapComponent } from './cesium-map/cesium-map.component';

const routes: Routes = [
  // other routes...
  {
    path: 'cesium',
    component: CesiumMapComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialVentaPage } from './historial-venta.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialVentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialVentaPageRoutingModule {}

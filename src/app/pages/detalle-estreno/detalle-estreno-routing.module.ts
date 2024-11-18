import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleEstrenoPage } from './detalle-estreno.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleEstrenoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleEstrenoPageRoutingModule {}

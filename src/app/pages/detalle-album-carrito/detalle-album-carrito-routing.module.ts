import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleAlbumCarritoPage } from './detalle-album-carrito.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleAlbumCarritoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleAlbumCarritoPageRoutingModule {}

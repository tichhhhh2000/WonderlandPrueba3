import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarDetalleAlbumPage } from './modificar-detalle-album.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarDetalleAlbumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarDetalleAlbumPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarAlbumPage } from './modificar-album.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarAlbumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarAlbumPageRoutingModule {}

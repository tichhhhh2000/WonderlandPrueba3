import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarAlbumPage } from './eliminar-album.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarAlbumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarAlbumPageRoutingModule {}

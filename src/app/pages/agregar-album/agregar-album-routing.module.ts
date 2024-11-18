import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarAlbumPage } from './agregar-album.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarAlbumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarAlbumPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerAlbumPage } from './ver-album.page';

const routes: Routes = [
  {
    path: '',
    component: VerAlbumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerAlbumPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstrenosAlbumPage } from './estrenos-album.page';

const routes: Routes = [
  {
    path: '',
    component: EstrenosAlbumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstrenosAlbumPageRoutingModule {}

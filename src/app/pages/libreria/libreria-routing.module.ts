import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibreriaPage } from './libreria.page';

const routes: Routes = [
  {
    path: '',
    component: LibreriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibreriaPageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarAlbumPageRoutingModule } from './modificar-album-routing.module';

import { ModificarAlbumPage } from './modificar-album.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarAlbumPageRoutingModule
  ],
  declarations: [ModificarAlbumPage]
})
export class ModificarAlbumPageModule {}

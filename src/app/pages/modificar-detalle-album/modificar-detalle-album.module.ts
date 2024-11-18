import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarDetalleAlbumPageRoutingModule } from './modificar-detalle-album-routing.module';

import { ModificarDetalleAlbumPage } from './modificar-detalle-album.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarDetalleAlbumPageRoutingModule
  ],
  declarations: [ModificarDetalleAlbumPage]
})
export class ModificarDetalleAlbumPageModule {}

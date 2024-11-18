import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleAlbumCarritoPageRoutingModule } from './detalle-album-carrito-routing.module';

import { DetalleAlbumCarritoPage } from './detalle-album-carrito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleAlbumCarritoPageRoutingModule
  ],
  declarations: [DetalleAlbumCarritoPage]
})
export class DetalleAlbumCarritoPageModule {}

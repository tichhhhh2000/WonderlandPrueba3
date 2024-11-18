import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarAlbumPageRoutingModule } from './eliminar-album-routing.module';

import { EliminarAlbumPage } from './eliminar-album.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarAlbumPageRoutingModule
  ],
  declarations: [EliminarAlbumPage]
})
export class EliminarAlbumPageModule {}

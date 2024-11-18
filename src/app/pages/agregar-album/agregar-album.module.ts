import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarAlbumPageRoutingModule } from './agregar-album-routing.module';

import { AgregarAlbumPage } from './agregar-album.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarAlbumPageRoutingModule
  ],
  declarations: [AgregarAlbumPage]
})
export class AgregarAlbumPageModule {}

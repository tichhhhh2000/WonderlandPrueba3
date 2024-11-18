import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerAlbumPageRoutingModule } from './ver-album-routing.module';

import { VerAlbumPage } from './ver-album.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerAlbumPageRoutingModule
  ],
  declarations: [VerAlbumPage]
})
export class VerAlbumPageModule {}

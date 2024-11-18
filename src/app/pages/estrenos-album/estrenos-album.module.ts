import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstrenosAlbumPageRoutingModule } from './estrenos-album-routing.module';

import { EstrenosAlbumPage } from './estrenos-album.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstrenosAlbumPageRoutingModule
  ],
  declarations: [EstrenosAlbumPage]
})
export class EstrenosAlbumPageModule {}

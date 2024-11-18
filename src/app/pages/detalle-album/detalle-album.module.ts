import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { DetalleAlbumPageRoutingModule } from './detalle-album-routing.module';
import { AlbumComponent } from './detalle-album.page';

const routes: Routes = [
  {
    path: '',
    component: AlbumComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    IonicModule,
    RouterModule.forChild(routes),
    DetalleAlbumPageRoutingModule
  ],
  declarations: [AlbumComponent]
})
export class DetalleAlbumPageModule {}

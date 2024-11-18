import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleLibreriaPageRoutingModule } from './detalle-libreria-routing.module';

import { DetalleLibreriaPage } from './detalle-libreria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleLibreriaPageRoutingModule
  ],
  declarations: [DetalleLibreriaPage]
})
export class DetalleLibreriaPageModule {}

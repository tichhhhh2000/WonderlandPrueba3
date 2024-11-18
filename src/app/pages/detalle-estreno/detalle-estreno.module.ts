import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleEstrenoPageRoutingModule } from './detalle-estreno-routing.module';

import { DetalleEstrenoPage } from './detalle-estreno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleEstrenoPageRoutingModule
  ],
  declarations: [DetalleEstrenoPage]
})
export class DetalleEstrenoPageModule {}

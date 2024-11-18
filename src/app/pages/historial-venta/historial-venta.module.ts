import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialVentaPageRoutingModule } from './historial-venta-routing.module';

import { HistorialVentaPage } from './historial-venta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialVentaPageRoutingModule
  ],
  declarations: [HistorialVentaPage]
})
export class HistorialVentaPageModule {}

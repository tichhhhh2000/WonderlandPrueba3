import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibreriaPageRoutingModule } from './libreria-routing.module';

import { LibreriaPage } from './libreria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibreriaPageRoutingModule
  ],
  declarations: [LibreriaPage]
})
export class LibreriaPageModule {}

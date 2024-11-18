import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  constructor(private toastController: ToastController) { }

  async GenerarToast(msg: string, duration: number, position:'top'|'bottom'|'middle'){
    const toast = await this.toastController.create({
      message: msg,
      duration: duration,
      position: position
    })
    await toast.present();
  }
}

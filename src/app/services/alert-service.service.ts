import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  constructor(private alertController: AlertController) { }


async GenerarAlerta(header : string, msg : string){
    const alerta = await this.alertController
    .create({
      header: header,
      message: msg,
      buttons: ['OK']
    })
    await alerta.present();
  }

  async GenerarAlertaPrompt(titulo: string, mensaje: string, callback: (respuesta: string) => void) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      inputs: [
        {
          name: 'respuesta',
          type: 'text',
          placeholder: 'Respuesta de seguridad'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            callback(data.respuesta);
          }
        }
      ]
    });
    await alert.present();
  }

}

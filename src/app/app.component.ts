import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ToastServiceService } from './services/toast-service.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(private router: Router, private menuController: MenuController, private toast :ToastServiceService, private storage : NativeStorage) {}


  
  async cerrarSesion(){
    const idusuario = await this.storage.remove('usuario_logueado')
    this.toast.GenerarToast('Sesión Cerrada con Éxito',2000,'bottom')
    this.menuController.close()
    console.log(idusuario);
    this.router.navigate(['/login'])
  }

  closeMenu(){
    this.menuController.close()
  }


  async mostrarNotifications(evento: any) {
    try {
      if (evento.detail.checked) {
        // Solicitar permisos de notificaciones
        const permiso = await LocalNotifications.requestPermissions();
        if (permiso.display === 'granted') {
          // Enviar notificación inmediata
          await LocalNotifications.schedule({
            notifications: [
              {
                title: "¡Wondeland!",
                body: "Hecha un vistazo a nuestros álbumes",
                id: 1,
                schedule: { 
                  at: new Date(Date.now() + 1000) 
                },
              }
            ]
          });
          console.log("Notificación enviada inmediatamente");
        } else {
          console.log("Permiso denegado para notificaciones");
        }
      } else {
        // Cancelar notificaciones si desactiva el toggle
        await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
        console.log("Notificaciones desactivadas");
      }
    } catch (error) {
      console.error("Error en la gestión de notificaciones:", error);
    }
  }


}






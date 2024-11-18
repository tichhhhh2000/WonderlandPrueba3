import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.page.html',
  styleUrls: ['./recuperar-contra.page.scss'],
})
export class RecuperarContraPage implements OnInit {

  correo: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bd: ServicebdService,
    private alerta: AlertServiceService
  ) {
    // Obtiene el correo desde los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.correo = params['correo'];
    });
  }

  cambiarContrasena() {
    if (this.nuevaContrasena !== this.confirmarContrasena) {
      this.alerta.GenerarAlerta('Error', 'Las contraseñas no coinciden');
      return;
    }
  
    if (!this.nuevaContrasena.trim()) {
      this.alerta.GenerarAlerta('Error', 'La contraseña no puede estar vacía');
      return;
    }
  
    // Obtener el ID del usuario usando el correo
    this.bd.obtenerIdPorCorreo(this.correo).then(idUsuario => {
      if (idUsuario) {
        // Actualizar la contraseña con el ID de usuario obtenido
        this.bd.actualizarContrasena(idUsuario, this.nuevaContrasena).then(() => {
          this.alerta.GenerarAlerta('Éxito', 'Contraseña actualizada');
          this.router.navigate(['/login']);
        }).catch((e: any) => {
          this.alerta.GenerarAlerta('Error', 'Error al actualizar la contraseña: ' + JSON.stringify(e));
        });
      } else {
        this.alerta.GenerarAlerta('Error', 'Usuario no encontrado');
      }
    }).catch((e: any) => {
      this.alerta.GenerarAlerta('Error', 'Error al obtener el ID del usuario: ' + JSON.stringify(e));
    });
  }
  

  ngOnInit() {}
}

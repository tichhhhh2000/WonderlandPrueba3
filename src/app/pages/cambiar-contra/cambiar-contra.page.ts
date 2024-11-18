import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-cambiar-contra',
  templateUrl: './cambiar-contra.page.html',
  styleUrls: ['./cambiar-contra.page.scss'],
})
export class CambiarContraPage implements OnInit {
  contrasenaActual: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  correo: string = '';

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

  async cambiarContrasena() {
    if (!this.contrasenaActual || !this.nuevaContrasena || !this.confirmarContrasena) {
      this.alerta.GenerarAlerta('Error', 'Por favor, rellene todos los campos');
      return;
    }

    if (this.nuevaContrasena !== this.confirmarContrasena) {
      this.alerta.GenerarAlerta('Error', 'Las contraseñas nuevas no coinciden');
      return;
    }

    if (!this.validarContrasena(this.nuevaContrasena)) {
      this.alerta.GenerarAlerta('Error', 'La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial');
      return;
    }

    try {
      const idUsuario = await this.bd.obtenerIdPorCorreo(this.correo);
      if (idUsuario) {
        const esContrasenaActualValida = await this.bd.consultarUsuarioPorID(idUsuario, this.contrasenaActual);
        if (esContrasenaActualValida) {
          const exito = await this.bd.actualizarContrasena(idUsuario, this.nuevaContrasena);
          if (exito) {
            this.alerta.GenerarAlerta('Éxito', 'Contraseña actualizada');
            this.router.navigate(['/modificar-perfil']);
          } else {
            this.alerta.GenerarAlerta('Error', 'Error al actualizar la contraseña');
          }
        } else {
          this.alerta.GenerarAlerta('Error', 'La contraseña actual es incorrecta');
        }
      } else {
        this.alerta.GenerarAlerta('Error', 'Usuario no encontrado');
      }
    } catch (e) {
      this.alerta.GenerarAlerta('Error', 'Error al cambiar la contraseña: ' + JSON.stringify(e));
    }
  }

  validarContrasena(password: string): boolean {
    const patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    return patron.test(password);
  }

  ngOnInit() {}
}

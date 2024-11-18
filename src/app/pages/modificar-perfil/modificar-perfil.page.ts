import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {
  userId!: number;
  usuario: string = '';
  correo: string = '';
  direccion: string = '';

  constructor(
    private route: ActivatedRoute,
    private bd: ServicebdService,
    private alerta: AlertServiceService,
    private router: Router // Importa el Router
  ) {
    const navigationState = history.state;
    if (navigationState && navigationState.usuarioSeleccionado) {
      this.userId = navigationState.usuarioSeleccionado;
    } else {
      this.alerta.GenerarAlerta('Error', 'ID de usuario no encontrado');
    }
  }

  ngOnInit() {
    this.cargarPerfil();
  }

  async cargarPerfil() {
    if (!this.userId) {
      this.alerta.GenerarAlerta('Error', 'Usuario no encontrado');
      return;
    }

    try {
      const usuarioInfo = await this.bd.traerUsuario(this.userId);
      if (usuarioInfo) {
        this.usuario = usuarioInfo.usuario;
        this.correo = usuarioInfo.correo_usuario;
        this.direccion = usuarioInfo.direccion;
      } else {
        this.alerta.GenerarAlerta('Error', 'No se encontró información del usuario');
      }
    } catch (e) {
      this.alerta.GenerarAlerta('Error', 'No se pudo cargar el perfil');
    }
  }

  async modificarPerfil() {
    const resultado = await this.bd.modificarUsuario(this.userId, this.usuario, this.direccion);
    if (resultado) {
      this.alerta.GenerarAlerta('Éxito', 'Perfil actualizado exitosamente');
    } else {
      this.alerta.GenerarAlerta('Error', 'No se pudo actualizar el perfil');
    }
  }

  async verificarPreguntaSeguridad() {
    try {
      const pregunta = await this.bd.obtenerPreguntaSeguridad(this.correo);
      this.alerta.GenerarAlertaPrompt('Pregunta de Seguridad', pregunta, async (respuesta) => {
        const esCorrecta = await this.bd.verificarRespuestaSeguridad(this.correo, respuesta);
        if (esCorrecta) {
          this.router.navigate(['/cambiar-contra'], { queryParams: { correo: this.correo } });
        } else {
          this.alerta.GenerarAlerta('Error', 'Respuesta incorrecta');
        }
      });
    } catch (e) {
      this.alerta.GenerarAlerta('Error', 'No se pudo obtener la pregunta de seguridad');
    }
  }
}

//ESTA PAGINA ESTA LISTA
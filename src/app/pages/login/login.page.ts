import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = ""; // Cambiado a email en lugar de username
  password: string = "";

  constructor(
    private router: Router, 
    private activaterouter: ActivatedRoute,
    private alerta: AlertServiceService, 
    private bd: ServicebdService, 
    private storage: NativeStorage) {}

  iniciarSesion() {
    const emailSinEspacios = this.email.trim();
    const passwordSinEspacios = this.password.trim();

    if (!emailSinEspacios || !passwordSinEspacios) {
      this.alerta.GenerarAlerta('Error', 'Rellene los campos');
    } else {
      this.bd.consultarUsuarioPorCorreo(emailSinEspacios, passwordSinEspacios).then(usuario => {
        if (usuario) {
          if (emailSinEspacios === passwordSinEspacios) {
            this.alerta.GenerarAlerta('Atención', 'Debes cambiar tu contraseña');
            this.router.navigate(['/cambiar-contrasena'], {
              state: { idUsuario: usuario.id_usuario }
            });
          } else if (usuario.id_rol === 1) {
            this.router.navigate(['/administracion']);
          } else {
            this.guardarUser(usuario.id_usuario);
            this.router.navigate(['/home']);
          }

          this.email = "";
          this.password = "";
        } else {
          this.password = "";
          this.alerta.GenerarAlerta('Error', 'Los datos no son correctos o no se encontró la cuenta');
        }
      }).catch(e => {
        this.alerta.GenerarAlerta('Error', 'Error en consultar datos: ' + JSON.stringify(e));
      });
    }
  }

  async guardarUser(idUser: number){
    try{
      await this.storage.setItem('usuario_logueado', idUser);
      console.log('Usuario guardado en almacenamiento local');
    } catch(error) {
      this.alerta.GenerarAlerta('Error', 'Error al guardar el usuario: ' + JSON.stringify(error));
    }
  }

  ngOnInit() {}
}

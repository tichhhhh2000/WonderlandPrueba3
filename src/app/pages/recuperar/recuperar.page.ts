import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  correo: string = '';
  respuesta: string = '';

  constructor(
    private router: Router,
    private bd: ServicebdService,
    private alerta: AlertServiceService
  ) {}

  verificarRespuesta() {
    this.bd.verificarRespuestaSeguridad(this.correo, this.respuesta).then(correcta => {
      if (correcta) {
        this.alerta.GenerarAlerta('Éxito', 'Respuesta correcta. Redirigiendo a cambio de contraseña...');
        // Redirige a la página de cambio de contraseña con los datos necesarios
        this.router.navigate(['/recuperar-contra'], { queryParams: { correo: this.correo } });
      } else {
        this.alerta.GenerarAlerta('Error', 'Respuesta incorrecta. Inténtelo de nuevo.');
      }
    }).catch(e => {
      this.alerta.GenerarAlerta('Error', 'Error al verificar la respuesta: ' + JSON.stringify(e));
    });
  }

  ngOnInit() {}
}

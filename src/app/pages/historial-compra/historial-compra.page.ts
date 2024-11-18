import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';

@Component({
  selector: 'app-historial-compra',
  templateUrl: './historial-compra.page.html',
  styleUrls: ['./historial-compra.page.scss'],
})
export class HistorialCompraPage implements OnInit {

  historialCompras: any[] = [];
  idUsuario!: number;

  constructor(
    private storage: NativeStorage,
    private bd: ServicebdService,
    private alerta: AlertServiceService
  ) {}

  ngOnInit() {
    this.obtenerHistorialCompras();
  }
  async obtenerHistorialCompras() {
    try {
      this.idUsuario = await this.storage.getItem('usuario_logueado');
      if (!this.idUsuario) {
        this.alerta.GenerarAlerta('Error', 'No se encontró el usuario logueado');
        return;
      }
  
      this.historialCompras = await this.bd.consultarHistorialComprasPorUsuario(this.idUsuario);
    } catch (e) {
      this.alerta.GenerarAlerta('Error', 'Error al cargar el historial de compras: ' + JSON.stringify(e));
    }
  }
  
}

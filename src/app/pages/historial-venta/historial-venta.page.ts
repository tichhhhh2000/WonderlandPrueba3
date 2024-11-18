import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-historial-venta',
  templateUrl: './historial-venta.page.html',
  styleUrls: ['./historial-venta.page.scss'],
})
export class HistorialVentaPage implements OnInit {

  historialVentas: any[] = [];

  constructor(private bd: ServicebdService) {}

  ngOnInit() {
    this.cargarHistorialVentas();
  }

  cargarHistorialVentas() {
    this.bd.obtenerHistorialVentas().then(data => {
      this.historialVentas = data;
    }).catch(error => {
      console.error('Error al cargar el historial de ventas:', error);
    });
  }
}

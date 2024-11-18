import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.page.html',
  styleUrls: ['./boleta.page.scss'],
})
export class BoletaPage implements OnInit {
  infoUsuario: any = {};
  totalCarrito: number = 0;
  albumsComprados: any[] = [];

  constructor(
    private router: Router,
    private bd: ServicebdService
  ) {}

  async ngOnInit() {
    const idVenta = this.bd.getLastVentaId();
    if (idVenta) {
      try {
        const ventaDetalles = await this.bd.obtenerDetallesVenta(idVenta);
        this.infoUsuario = ventaDetalles.usuario;
        this.totalCarrito = ventaDetalles.total;
        this.albumsComprados = ventaDetalles.albums;
      } catch (e) {
        console.error('Error al cargar los detalles de la compra:', e);
      }
    } else {
      console.warn('No se encontró el ID de la última venta.');
    }
  }

  volverAlInicio() {
    this.router.navigate(['/home']);
  }
}

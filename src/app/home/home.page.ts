
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from '../services/servicebd.service';
import { Productos } from '../modules/productos';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  

  albums: Productos[] = [];
  
  constructor(private router: Router, private bd: ServicebdService) {}

  ngOnInit() {
    this.cargarAlbums();
    // Cargar los álbumes al iniciar la página
    this.bd.consultarProducto();
    // Suscribirse al observable de cambio de stock para actualizar la lista automáticamente
    this.bd.stockCambiado$.subscribe(() => {
      console.log('Cambio de stock detectado. Recargando productos...');
      this.cargarAlbums(); // Recargar los productos al detectar un cambio de stock
    });
    this.bd.dbState().subscribe((res) => {
      if (res) {
        this.bd.fetchProducto().subscribe((data) => {
          this.albums = data; // Guardar los álbumes recibidos en la lista
        });
      }
    });
  }

  // Método para cargar los productos desde la base de datos
  cargarAlbums() {
    this.bd.consultarProducto(); // Realiza la consulta inicial de productos
    this.bd.dbState().subscribe((res) => {
      if (res) {
        this.bd.fetchProducto().subscribe((data) => {
          this.albums = data; // Guardar los productos en la lista de álbumes
        });
      }
    });
  }

   // Navegar a la página de detalles del álbum seleccionado
   irAlbum(album: Productos) {
    const navigationExtras: NavigationExtras = {
      state: { albumSelec: album },
    };
    this.router.navigate(['/detalle-album'], navigationExtras);
  }
}


// CUIDADO CON HACER CTRL Z DESPUES DE ESTE MENSAJE
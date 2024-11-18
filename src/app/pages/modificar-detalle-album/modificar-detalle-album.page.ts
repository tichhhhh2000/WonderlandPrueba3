import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-modificar-detalle-album',
  templateUrl: './modificar-detalle-album.page.html',
  styleUrls: ['./modificar-detalle-album.page.scss'],
})
export class ModificarDetalleAlbumPage implements OnInit {

  nombreArtista: string = 'BTS';
  nombreAlbum: string = 'Wings';
  precio: number = 21990;

  albums: any [] = [];

  constructor(private router: Router, private alerta: AlertServiceService, private toast: ToastServiceService, private bd: ServicebdService) { }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.bd.consultarProducto();
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.bd.fetchProducto().subscribe(data => {
          this.albums = data;
        });
      }
    });
  }

  validacion(album: any) {
    // Validaciones
    if (!album.nombre_artista || !album.nombre_album || !album.precio_album) {
      this.alerta.GenerarAlerta('Error', 'Rellene todos los campos');
    } else if (album.precio_album <= 0) {
      this.toast.GenerarToast('El precio debe ser mayor a 0', 2000, 'middle');
    } else {
      // Si la validación es correcta, procede a modificar el álbum
      this.modificarAlbum(album);
    }
  }

  modificarAlbum(album: any) {
    this.bd.modificarProducto(album.id_album, album.nombre_artista, album.nombre_album, album.detalle_album, album.precio_album, album.portada_album, album.stock).then(res => {
      if (res) {
        // Mostrar toast de éxito
        this.toast.GenerarToast('El álbum ha sido modificado con éxito', 2000, 'middle');
        // Redirigir al usuario
        this.router.navigate(['/modificar-album']);
      } else {
        // Mostrar toast de error si la modificación falló
        this.toast.GenerarToast('Error al modificar el álbum', 2000, 'middle');
      }
    }).catch(err => {
      console.log('Error al modificar el álbum:', err);
    });
  }
}
//NO MAS COTROL Z
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { CamaraService } from 'src/app/services/camara.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { AlertController } from '@ionic/angular'; // Importa AlertController

@Component({
  selector: 'app-modificar-album',
  templateUrl: './modificar-album.page.html',
  styleUrls: ['./modificar-album.page.scss'],
})
export class ModificarAlbumPage implements OnInit {

  nombreArtista: string = 'BTS';
  nombreAlbum: string = 'Wings';
  precio: number = 21990;
  portadaAlbum: string | null = null;
  stock: number = 20;
  albums: any[] = [];
  albumsFiltrados: any[] = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    private alerta: AlertServiceService,
    private toast: ToastServiceService,
    private bd: ServicebdService,
    private camera: CamaraService,
    private alertController: AlertController 
  ) { }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.bd.consultarProducto();
    this.bd.dbState().subscribe(res => {
      this.bd.fetchProducto().subscribe(data => {
        this.albums = data.map(album => ({
          ...album,
          stock: album.stock || 0
        }));
        this.albumsFiltrados = this.albums; // Inicialmente muestra todos los álbumes
      });
    });
  }

  filtrarAlbums() {
    const search = this.searchTerm.toLowerCase();
    this.albumsFiltrados = this.albums.filter(
      (album) =>
        album.nombre_album.toLowerCase().includes(search) ||
        album.nombre_artista.toLowerCase().includes(search)
    );
  }

  async validacion(album: any) {
    if (!album.nombre_artista) {
      this.alerta.GenerarAlerta('Error', 'El campo "Nombre Artista" está vacío.');
      return;
    }
    if (!album.nombre_album) {
      this.alerta.GenerarAlerta('Error', 'El campo "Nombre Álbum" está vacío.');
      return;
    }
    if (album.precio_album <= 0) {
      this.toast.GenerarToast('El campo "Precio Álbum" debe ser mayor a 0', 1000, 'middle');
      return;
    }
    if (album.stock < 0) {
      this.alerta.GenerarAlerta('Error', 'El campo "Stock" no puede ser negativo');
      return;
    }

    // Verifica si el stock es 0
    if (album.stock === 0) {
      const alert = await this.alertController.create({
        header: 'Confirmar',
        message: 'El stock está en 0. ¿Está seguro de continuar?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              return; // Cancela la operación
            }
          },
          {
            text: 'Sí',
            handler: () => {
              this.modificarAlbum(album); // Llama a la función para modificar el álbum
            }
          }
        ]
      });
      await alert.present();
    } else {
      this.modificarAlbum(album); // Procede si el stock no es 0
    }
  }

  modificarAlbum(album: any) {
    this.bd.modificarProducto(
      album.id_album,
      album.nombre_artista,
      album.nombre_album,
      album.detalle_album,
      album.precio_album,
      album.portada_album,
      album.stock
    ).then(res => {
      if (res) {
        this.toast.GenerarToast('Álbum modificado con éxito', 1000, 'middle');
        this.router.navigate(['/modificar-album']);
      } else {
        this.toast.GenerarToast('Error al modificar el álbum', 1000, 'middle');
      }
    }).catch(err => {
      console.error('Error al modificar el álbum:', err);
      this.toast.GenerarToast('Error al modificar el álbum', 1000, 'middle');
    });
  }

  async ingresarImagen(album: any) {
    try {
      const resultado = await this.camera.tomarFoto();
      if (resultado) {
        album.portada_album = resultado;
        this.toast.GenerarToast('Imagen añadida correctamente', 1000, 'middle');
      } else {
        this.toast.GenerarToast('No se pudo obtener la imagen.', 1000, 'middle');
      }
    } catch (error: any) {
      if (error === 'User cancelled photos app' || error.message === 'User cancelled photos app') {
        return;
      } else {
        this.alerta.GenerarAlerta('Error', 'Error con ingresar Imagen' + error);
      }
    }
  }
}

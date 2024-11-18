import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-eliminar-album',
  templateUrl: './eliminar-album.page.html',
  styleUrls: ['./eliminar-album.page.scss'],
})
export class EliminarAlbumPage implements OnInit {

  albums: any[] = [];
  albumsFiltrados: any[] = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    private toast: ToastServiceService,
    private bd: ServicebdService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.bd.consultarProducto().then(() => {
      this.bd.fetchProducto().subscribe(data => {
        this.albums = data;
        this.albumsFiltrados = [...this.albums]; // Inicializa con todos los álbumes
      });
    });
  }

  filtrarAlbums() {
    const search = this.searchTerm.toLowerCase();
    if (search.trim() === '') {
      // Si no hay búsqueda, muestra todos los álbumes
      this.albumsFiltrados = [...this.albums];
    } else {
      // Filtra los álbumes según el término de búsqueda
      this.albumsFiltrados = this.albums.filter(
        (album) =>
          album.nombre_album.toLowerCase().includes(search) ||
          album.nombre_artista.toLowerCase().includes(search)
      );
    }
  }

  ocultarAlbum(id_album: number) {
    this.bd.ocultarProducto(id_album).then(res => {
      if (res) {
        this.albums = this.albums.map(album => 
          album.id_album === id_album ? { ...album, visible: 0 } : album
        );
        this.filtrarAlbums(); // Refresca la vista después de ocultar
        this.toast.GenerarToast('Álbum ocultado', 1000, 'middle');
      }
    }).catch(err => {
      console.error('Error al ocultar el álbum:', err);
    });
  }

  mostrarAlbum(id_album: number) {
    this.bd.mostrarProducto(id_album).then(res => {
      if (res) {
        this.albums = this.albums.map(album => 
          album.id_album === id_album ? { ...album, visible: 1 } : album
        );
        this.filtrarAlbums(); // Refresca la vista después de mostrar
        this.toast.GenerarToast('Álbum mostrado', 1000, 'middle');
      }
    }).catch(err => {
      console.error('Error al mostrar el álbum:', err);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-ver-album',
  templateUrl: './ver-album.page.html',
  styleUrls: ['./ver-album.page.scss'],
})
export class VerAlbumPage implements OnInit {

  albums: any[] = [];
  albumsFiltrados: any[] = [];
  searchTerm: string = '';

  constructor(private router: Router, private bd: ServicebdService) {}

  ngOnInit() {
    this.cargarAlbums();
  }

  cargarAlbums() {
    this.bd.consultarProducto();
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.bd.fetchProducto().subscribe(data => {
          this.albums = data;
          this.albumsFiltrados = [...this.albums]; // Inicializa con todos los álbumes
        });
      }
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
}

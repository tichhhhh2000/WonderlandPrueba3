import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Productos } from 'src/app/modules/productos';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  searchTerm: string = '';   
  albums: Productos[] = [];          
  albumsFiltrados: Productos[] = [];  
  

  constructor(private router: Router, private bd: ServicebdService) { }

  ngOnInit() {
    this.bd.consultarProducto();
    this.bd.fetchProducto().subscribe((data) => {
      this.albums = data;
      this.albumsFiltrados = data; // Inicialmente muestra todos los álbumes
    });
  }

  // Filtrar los álbumes según el término ingresado en el campo de búsqueda
  filtrarAlbums() {
    const search = this.searchTerm.toLowerCase();
    this.albumsFiltrados = this.albums.filter(
      (album) =>
        album.nombre_album.toLowerCase().includes(search) ||
        album.nombre_artista.toLowerCase().includes(search)
    );
  }


  // Navegar a la página de detalle del álbum seleccionado
  irAlbum(album: Productos) {
    const navigationExtras: NavigationExtras = {
      state: { albumSelec: album },
    };
    this.router.navigate(['/detalle-album'], navigationExtras);
  }
}

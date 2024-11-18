import { Component, OnInit } from '@angular/core';
import { EstrenoService } from 'src/app/services/estreno.service';

@Component({
  selector: 'app-estrenos-album',
  templateUrl: './estrenos-album.page.html',
  styleUrls: ['./estrenos-album.page.scss'],
})
export class EstrenosAlbumPage implements OnInit {

  estrenos: any[] = []; // Variable para almacenar los discos

  constructor(private estrenoService: EstrenoService) {}

  ngOnInit() {
    this.cargarEstrenos(); // Cargar los estrenos al inicializar la página
  }

  // Método para cargar los estrenos desde la API
  cargarEstrenos() {
    this.estrenoService.getEstrenos().subscribe(
      (data: any[]) => {
        console.log('Discos recibidos:', data); // Mostrar los discos en la consola
        this.estrenos = data; // Asignar los discos recibidos a la variable
      },
      (error) => {
        console.error('Error al cargar los discos:', error);
      }
    );
  }
}

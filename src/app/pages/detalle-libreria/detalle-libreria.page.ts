import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-detalle-libreria',
  templateUrl: './detalle-libreria.page.html',
  styleUrls: ['./detalle-libreria.page.scss'],
})
export class DetalleLibreriaPage implements OnInit {

  album: any = {
    nombre: 'Wings',
    artista: 'BTS',
    genero: 'K-pop',
    precio: '$21.990',
    portada: 'assets/icon/wings.jpg',
  }

  constructor(private router: Router, private toast: ToastServiceService) { }


  eliminarAlbum() {
    this.toast.GenerarToast('Se eliminó de Favoritos', 2000, 'middle');
  }

  agregarAlbum() {
    this.toast.GenerarToast('Se agregó al carrito', 2000, 'middle');
  }

  ngOnInit() {
  }

}

//NO MAS COTROL Z
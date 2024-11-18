import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertServiceService } from 'src/app/services/alert-service.service';

@Component({
  selector: 'app-detalle-album-carrito',
  templateUrl: './detalle-album-carrito.page.html',
  styleUrls: ['./detalle-album-carrito.page.scss'],
})
export class DetalleAlbumCarritoPage implements OnInit {

  album: any = {
    nombre: 'Wings',
    artista: 'BTS',
    genero: 'K-pop',
    precio: '$21.990',
    portada: 'assets/icon/wings.jpg',
  }

  constructor(
    private router: Router, 
    private activaterouter: ActivatedRoute, 
    private alerta: AlertServiceService
  ) { 
    this.activaterouter.params.subscribe(params =>{

    })
  }

  aceptarEliminar(){
    this.alerta.GenerarAlerta('', 'Su producto fue eliminado exitosamente')
  }

  ngOnInit() {
  }

}
//NO MAS COTROL Z
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Carrito } from 'src/app/modules/carrito';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-detalle-album',
  templateUrl: './detalle-album.page.html',
  styleUrls: ['./detalle-album.page.scss'],
})
export class AlbumComponent implements OnInit {

  album: any;
  IDUSUARIO!: number;
  infoUsuario: any;
  cantidad: number = 1;
  esFavorito: boolean = false; // Verifica si está en favoritos
  listaCarrito: Carrito[] = [];

  constructor(
    private router: Router, 
    private toast: ToastServiceService, 
    private alerta: AlertServiceService, 
    private storage : NativeStorage, 
    private bd: ServicebdService, 
    private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.album = this.router.getCurrentNavigation()?.extras.state?.['albumSelec']
      }
      else {
        console.log('No se recibieron datos del álbum.');
      }
  })}

  async ngOnInit() {
    this.IDUSUARIO = await this.obtenerUsuario();
  
    if (this.IDUSUARIO) {
      this.verificarFavorito(); // Verificar si el álbum es favorito
  
      // Suscribirse al carrito para tener la lista actualizada
      this.bd.fetchCarrito().subscribe(data => {
        this.listaCarrito = data; // Cargar la lista del carrito
      });
    }
  }
  

  async obtenerUsuario() {
    try {
      const idUsuario = await this.storage.getItem('usuario_logueado');
      return idUsuario;
    } catch (e) {
      this.alerta.GenerarAlerta('Error', 'Error obteniendo el usuario: ' + JSON.stringify(e));
      return null;
    }
  }

  agregarAlbum() {
    const albumExistente = this.listaCarrito.find(item => item.id_album === this.album.id_album);
    
    const stockDisponible = this.album.stock;
    const cantidadSolicitada = albumExistente ? albumExistente.cantidad + this.cantidad : this.cantidad;
  
    if (cantidadSolicitada > stockDisponible) {
      this.alerta.GenerarAlerta('Error', 'No hay suficiente stock disponible.');
      return;
    }
  
    if (albumExistente) {
      const nuevaCantidad = albumExistente.cantidad + this.cantidad;
      this.bd.actualizarCantidad(nuevaCantidad, albumExistente.id_carrito).then(() => {
        this.toast.GenerarToast('Se añadió al carrito', 1000, 'middle');
        this.bd.mostrarCarrito(this.IDUSUARIO);
      }).catch(e => {
        this.alerta.GenerarAlerta('Error', 'Error al actualizar la cantidad: ' + JSON.stringify(e));
      });
    } else {
      this.bd.agregarCarrito(this.album.id_album, this.IDUSUARIO, this.cantidad).then(() => {
        this.toast.GenerarToast('Álbum añadido al carrito', 1000, 'middle');
        this.bd.mostrarCarrito(this.IDUSUARIO);
      }).catch(e => {
        this.alerta.GenerarAlerta('Error', 'Error al añadir al carrito: ' + JSON.stringify(e));
      });
    }
  }
  
  
  

  guardarAlbum() {
    if (this.esFavorito) {
      this.bd.eliminarFavorito(this.album.id_album, this.IDUSUARIO).then(() => {
        this.toast.GenerarToast('Álbum eliminado de favoritos', 1000, 'middle');
        this.esFavorito = false;
      });
    } else {
      this.bd.agregarFavorito(this.album.id_album, this.IDUSUARIO).then(() => {
        this.toast.GenerarToast('Álbum añadido a favoritos', 1000, 'middle');
        this.esFavorito = true;
      });
    }
  }

  verificarFavorito() {
    this.bd.verificarFavorito(this.album.id_album, this.IDUSUARIO).then(res => {
      this.esFavorito = res;
    });
  }

  sumar() {
    this.cantidad++;
  }

  restar() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

}


//NO MAS COTROL Z
// TE ARREPIENTES BORA HASTA ACA
//ULTIMA VEZ INTENTANDO HACER EL STOCK
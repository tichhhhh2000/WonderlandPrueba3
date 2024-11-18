import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController} from '@ionic/angular';
import { Favoritos } from 'src/app/modules/favoritos';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-libreria',
  templateUrl: './libreria.page.html',
  styleUrls: ['./libreria.page.scss'],
})
export class LibreriaPage implements OnInit {

  albums: any [] = [];
  IDUSUARIO!: number;
  favoritos: Favoritos[] = [];

  constructor(
    private router: Router, 
    private toast: ToastServiceService,
    private bd: ServicebdService,
    private alerta: AlertServiceService,
    private storage: NativeStorage)
     { }
  
     async ngOnInit() {
      const usuario = await this.obtenerUsuario();
      if (usuario) {
        this.IDUSUARIO = usuario;
        this.cargarFavoritos();
      }
    }
  
    async obtenerUsuario() {
      try {
        const idUsuario = await this.storage.getItem('usuario_logueado');
        return idUsuario;
      } catch (e) {
        this.alerta.GenerarAlerta(
          'Error',
          'Error obteniendo el usuario: ' + JSON.stringify(e)
        );
        return null;
      }
    }
  
    cargarFavoritos() {
      this.bd.consultarFavoritos(this.IDUSUARIO); // Consultar favoritos
      this.bd.fetchFavoritos().subscribe(data => {
        this.favoritos = data;
        console.log('Favoritos recibidos:', this.favoritos);
      });
    }
    


    eliminarAlbum(favorito: any) {
      const idFavorito = favorito.id_favorito;
      this.bd.eliminarFavoritodeFavoritos(idFavorito).then(() => {
        this.toast.GenerarToast('Se eliminó de favoritos', 500, 'middle');
        // Volver a cargar la lista de favoritos para asegurarse de que se haya eliminado
        this.cargarFavoritos();
      }).catch((e) => {
        this.alerta.GenerarAlerta('Error', 'Error al eliminar favorito: ' + JSON.stringify(e));
      });
    }
    

  

    async agregarAlbum(favorito: any) {
      const id_album = favorito.id_album;
      const cantidad = 1;
    
      try {
        // Obtener la lista del carrito para verificar si ya existe el álbum
        const carrito = await this.bd.mostrarCarrito(this.IDUSUARIO) || [];
        const albumExistente = carrito.find(item => item.id_album === id_album);
    
        if (albumExistente) {
          // Si el álbum ya está en el carrito, incrementar la cantidad
          const nuevaCantidad = albumExistente.cantidad + cantidad;
          await this.bd.actualizarCantidad(nuevaCantidad, albumExistente.id_carrito);
          this.toast.GenerarToast('Se añadió al carrito', 500, 'middle');
        } else {
          // Si el álbum no está en el carrito, agregarlo como nuevo
          await this.bd.agregarCarrito(id_album, this.IDUSUARIO, cantidad);
          this.toast.GenerarToast('Álbum añadido al carrito', 500, 'middle');
        }
    
        // Opcional: Recargar el carrito si deseas actualizar la lista visualmente
        await this.bd.mostrarCarrito(this.IDUSUARIO);
      } catch (e) {
        this.alerta.GenerarAlerta('Error', 'Error al añadir al carrito: ' + JSON.stringify(e));
      }
    }
    


  irDetalles(favorito : any){
    let navigation : NavigationExtras={
      state:{
        albumSelec : favorito
      }
    }
    this.router.navigate(['/detalle-album'],navigation)
  }

  irHome() {
    this.router.navigate(['/home']);
  }
  
}

//NO MAS COTROL Z
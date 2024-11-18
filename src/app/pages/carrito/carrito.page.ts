import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Carrito } from 'src/app/modules/carrito';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

 
  listaCarrito : Carrito[] = [];
  totalCarrito!: number; // Variable para almacenar el total del carrito
  idusuario!: number;
  infoUsuario: any = [];

  constructor(
    private router: Router, 
    private storage : NativeStorage,
    private bd: ServicebdService,
    private activaterouter: ActivatedRoute, 
    private alerta: AlertServiceService,
    private toast: ToastServiceService)
  {

  }

  ngOnInit() {
    this.storage.getItem('usuario_logueado').then((idUsuario) => {
      if (idUsuario) {
        console.log('ID del usuario logueado:', idUsuario);
        this.idusuario = idUsuario;
  
        this.bd.mostrarCarrito(this.idusuario).then(() => {
          this.bd.fetchCarrito().subscribe(data => {
            this.listaCarrito = data;
            this.calcularTotalCarrito(); // Calcula el total después de actualizar
          });
        });
  
        this.bd.traerUsuario(this.idusuario).then(data => {
          this.infoUsuario = data;
          console.log('Usuario:', this.infoUsuario.usuario); // Log para verificar los datos
          console.log('Correo:', this.infoUsuario.correo_usuario);
        }).catch(e => {
          console.error('Error obteniendo usuario:', e);
        });
      }
    }).catch(e => {
      this.alerta.GenerarAlerta('Error', 'No se pudo obtener el usuario logueado: ' + JSON.stringify(e));
    });
  }
  
  
 
  calcularTotalCarrito() {
    this.totalCarrito = this.listaCarrito.reduce((acc, album) => {
      return acc + album.precio_album * album.cantidad;
    }, 0);
  }



  async aceptarCompra() {
    if (this.listaCarrito.length === 0) {
      this.alerta.GenerarAlerta('Error', 'El carrito está vacío. Agrega productos para continuar.');
      return;
    }
  
    try {
      const sinStock = [];
      for (const album of this.listaCarrito) {
        const stockDisponible = await this.bd.obtenerStockActual(album.id_album);
        if (stockDisponible < album.cantidad) {
          sinStock.push(album.nombre_album);
        }
      }
  
      if (sinStock.length > 0) {
        const nombresSinStock = sinStock.join(', ');
        this.alerta.GenerarAlerta('Error', `Los siguientes productos no tienen stock suficiente para completar la compra: ${nombresSinStock}`);
        return;
      }
  
      await this.bd.registrarVenta(this.idusuario, this.totalCarrito, this.listaCarrito);
      await this.bd.vaciarCarrito(this.idusuario);
  
      // Asegurarse de que los datos se pasan correctamente al navegar a BoletaPage
      this.router.navigate(['/boleta'], {
        state: {
          usuario: this.infoUsuario,
          total: this.totalCarrito,
          albums: this.listaCarrito
        }
      });
  
      this.toast.GenerarToast('Su compra fue realizada con éxito', 1000, 'middle');
      console.log('Carrito vaciado exitosamente.');
  
    } catch (e) {
      this.alerta.GenerarAlerta('Error', 'Error al procesar la compra: ' + JSON.stringify(e));
    }
  }
  
  


  
  
  

  eliminarCarrito(album: any) {
    this.bd.eliminarCarrito(album.id_carrito).then(() => {
      this.toast.GenerarToast('Artículo borrado perfectamente', 1000, 'middle');
      
      // Llamada correcta a mostrarCarrito con el ID del usuario
      this.bd.mostrarCarrito(this.idusuario).then(() => {
        this.calcularTotalCarrito(); // Recalcula el total después de eliminar
      });
    }).catch(e => {
      this.alerta.GenerarAlerta('Error', 'Error al eliminar el artículo: ' + JSON.stringify(e));
    });
  }
  

  calcularTotal(precio: number, cantidad: number): number {
    return precio * cantidad;
  }
  
  sumar(album: any) {
    this.bd.obtenerStockActual(album.id_album).then(stockDisponible => {
      if (album.cantidad < stockDisponible) {
        album.cantidad++;
        this.bd.actualizarCantidad(album.cantidad, album.id_carrito);
        this.calcularTotalCarrito(); // Recalcula el total después de sumar
      } else {
        this.toast.GenerarToast('No puedes añadir más de la cantidad disponible en stock', 1000, 'middle');
      }
    }).catch(error => {
      console.error('Error al obtener stock disponible:', error);
    });
  }
  

  restar(album: any){
    if (album.cantidad > 1) {
      album.cantidad--;
      this.bd.actualizarCantidad(album.cantidad,album.id_carrito)
      this.calcularTotalCarrito(); // Recalcula el total después de sumar
    }
  }


  irHome() {
    this.router.navigate(['/home']);
  }

}

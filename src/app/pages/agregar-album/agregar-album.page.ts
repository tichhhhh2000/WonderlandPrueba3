import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { CamaraService } from 'src/app/services/camara.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-agregar-album',
  templateUrl: './agregar-album.page.html',
  styleUrls: ['./agregar-album.page.scss'],
})
export class AgregarAlbumPage implements OnInit {

  nombreArtista: string = '';
  nombreAlbum: string = '';
  detalleAlbum: string = '';
  precio: number = 0;
  portadaAlbum: string | null = null;
  stock: number = 0;

  constructor(
    private router: Router,
    private alerta: AlertServiceService,
    private toast: ToastServiceService,
    private bd: ServicebdService,
    private camera: CamaraService,
    private alertController: AlertController
  ) { }

  async validacion() {
    if (!this.nombreArtista) {
      this.alerta.GenerarAlerta('Error', 'El campo "Nombre Artista" está vacío.');
      return;
    } 
    if (!this.nombreAlbum) {
      this.alerta.GenerarAlerta('Error', 'El campo "Nombre Álbum" está vacío.');
      return;
    } 
    if (this.precio <= 0) {
      this.alerta.GenerarAlerta('Error', 'El campo "Precio Álbum" debe ser mayor a 0.');
      return;
    } 
    if (this.stock < 0) {
      this.alerta.GenerarAlerta('Error', 'El campo "Stock" no puede ser negativo.');
      return;
    }

    // Verifica si el stock es 0
    if (this.stock === 0) {
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
              this.procederAgregarAlbum(); // Llama a la función para agregar el álbum
            }
          }
        ]
      });
      await alert.present();
    } else {
      this.procederAgregarAlbum(); // Procede si el stock no es 0
    }
  }

  // Nueva función para insertar el álbum después de la confirmación
  procederAgregarAlbum() {
    this.bd.insertarProducto(this.nombreArtista, this.nombreAlbum, this.detalleAlbum, this.precio, this.portadaAlbum, this.stock)
      .then((res) => {
        if (res) {
          this.toast.GenerarToast('El álbum ha sido añadido exitosamente', 1000, 'middle');
          this.router.navigate(['/administracion']);
        } else {
          this.alerta.GenerarAlerta('Error', 'Hubo un problema al añadir el álbum');
        }
      })
      .catch(err => {
        this.alerta.GenerarAlerta('Error', 'Error al insertar álbum: ' + JSON.stringify(err));
      });
  }
  
  

  ngOnInit() {
  }

  async ingresarImagen(){
    try{
     const resultado = await this.camera.tomarFoto();
     if(resultado){
      this.portadaAlbum = resultado
      this.toast.GenerarToast('Imagen añadida correctamente',1000,'middle')
     }else{
      this.toast.GenerarToast('No se pudo obtener la imagen.',1000,'middle')
     }
    }catch(error : any){
      if (error === 'User cancelled photos app'|| error.message === 'User cancelled photos app'){
        return
      }else{
        this.alerta.GenerarAlerta('Error','Error con ingresar Imagen'+ error) 
      }
     
    }
  }
}

// no hagas ctrl z 
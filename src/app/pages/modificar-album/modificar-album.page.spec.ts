import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { ModificarAlbumPage } from './modificar-album.page';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { CamaraService } from 'src/app/services/camara.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, BehaviorSubject } from 'rxjs';

// Mock para Router
class MockRouter {
  navigate(commands: any[], extras?: any) {
    console.log(`Navegando a: ${commands} con extras:`, extras);
  }
}

// Mock para NavController
class MockNavController {
  navigateRoot(url: string) {
    console.log(`Navegando a raíz: ${url}`);
  }
}

// Mock para ServicebdService
class MockServicebdService {
  private dbReady = new BehaviorSubject(true);
  private productos = new BehaviorSubject([
    { id_album: 1, nombre_artista: 'Mock Artista', nombre_album: 'Mock Album', stock: 10, precio_album: 1000 },
  ]);

  consultarProducto() {
    console.log('Consultando productos...');
  }

  dbState() {
    return this.dbReady.asObservable();
  }

  fetchProducto() {
    return this.productos.asObservable();
  }

  modificarProducto(id: number, artista: string, album: string, detalle: string, precio: number, portada: string, stock: number) {
    console.log('Modificando producto:', { id, artista, album, detalle, precio, portada, stock });
    return Promise.resolve(true);
  }
}

// Mock para AlertServiceService
class MockAlertServiceService {
  GenerarAlerta(titulo: string, mensaje: string) {
    console.log(`Alerta generada - Título: ${titulo}, Mensaje: ${mensaje}`);
  }
}

// Mock para ToastServiceService
class MockToastServiceService {
  GenerarToast(mensaje: string, duracion: number, posicion: string) {
    console.log(`Toast generado - Mensaje: ${mensaje}, Duración: ${duracion}, Posición: ${posicion}`);
  }
}

// Mock para CamaraService
class MockCamaraService {
  tomarFoto() {
    console.log('Tomando foto...');
    return Promise.resolve('data:image/png;base64,mock-image-data');
  }
}

describe('ModificarAlbumPage', () => {
  let component: ModificarAlbumPage;
  let fixture: ComponentFixture<ModificarAlbumPage>;
  let alertController: AlertController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarAlbumPage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: NavController, useClass: MockNavController },
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: AlertServiceService, useClass: MockAlertServiceService },
        { provide: ToastServiceService, useClass: MockToastServiceService },
        { provide: CamaraService, useClass: MockCamaraService },
        AlertController,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarAlbumPage);
    component = fixture.componentInstance;
    alertController = TestBed.inject(AlertController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar un error si el precio es menor que 0', () => {
    // Configurar espía para el servicio de Toast
    const toastSpy = spyOn(
      TestBed.inject(ToastServiceService),
      'GenerarToast'
    );

    // Crear un álbum con precio menor que 0
    const album = {
      id_album: 1,
      nombre_artista: 'Mock Artista',
      nombre_album: 'Mock Album',
      detalle_album: 'Detalle del álbum',
      precio_album: -10, // Precio inválido
      portada_album: 'mock-portada.jpg',
      stock: 10,
    };

    // Llamar a la validación
    component.validacion(album);

    // Verificar que se genera un Toast con el mensaje correcto
    expect(toastSpy).toHaveBeenCalledWith(
      'El campo "Precio Álbum" debe ser mayor a 0',
      1000,
      'middle'
    );
  });
});

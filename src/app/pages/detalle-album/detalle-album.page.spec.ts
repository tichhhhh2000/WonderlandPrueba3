import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumComponent } from './detalle-album.page';
import { Router, ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

// Mock para Router
class MockRouter {
  getCurrentNavigation() {
    return {
      extras: {
        state: {
          albumSelec: { id_album: 1, nombre_album: 'Mock Album', stock: 10 },
        },
      },
    };
  }

  navigate(commands: any[], extras?: any) {
    console.log(`Navegando a: ${commands} con extras:`, extras);
  }
}

// Mock para ActivatedRoute
class MockActivatedRoute {
  queryParams = of({});
}

// Mock para NativeStorage
class MockNativeStorage {
  private storage: { [key: string]: any } = {};

  getItem(key: string) {
    if (this.storage[key]) {
      return Promise.resolve(this.storage[key]);
    } else {
      return Promise.reject({ code: 2, message: 'No existe el item' });
    }
  }

  setItem(key: string, value: any) {
    this.storage[key] = value;
    return Promise.resolve(value);
  }
}

// Mock para ServicebdService
class MockServicebdService {
  fetchCarrito() {
    return of([]);
  }

  agregarCarrito(id_album: number, id_usuario: number, cantidad: number) {
    console.log(`Álbum agregado: ID ${id_album}, Usuario ${id_usuario}, Cantidad ${cantidad}`);
    return Promise.resolve();
  }

  actualizarCantidad(cantidad: number, id_carrito: number) {
    console.log(`Cantidad actualizada a ${cantidad} para el carrito con ID ${id_carrito}`);
    return Promise.resolve();
  }

  verificarFavorito(id_album: number, id_usuario: number) {
    console.log(`Verificando favorito para álbum ${id_album} y usuario ${id_usuario}`);
    return Promise.resolve(false); // Simula que no es favorito
  }

  agregarFavorito(id_album: number, id_usuario: number) {
    console.log(`Álbum ${id_album} añadido a favoritos para usuario ${id_usuario}`);
    return Promise.resolve();
  }

  eliminarFavorito(id_album: number, id_usuario: number) {
    console.log(`Álbum ${id_album} eliminado de favoritos para usuario ${id_usuario}`);
    return Promise.resolve();
  }
}

// Mock para ToastServiceService
class MockToastServiceService {
  GenerarToast(message: string, duration: number, position: string) {
    console.log(`Toast: ${message} - Duración: ${duration} - Posición: ${position}`);
  }
}

// Mock para AlertServiceService
class MockAlertServiceService {
  GenerarAlerta(header: string, message: string) {
    console.log(`Alerta: ${header} - ${message}`);
  }
}

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbumComponent],
      imports: [HttpClientTestingModule], // Importa el módulo de pruebas para HttpClient
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: NativeStorage, useClass: MockNativeStorage },
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: ToastServiceService, useClass: MockToastServiceService },
        { provide: AlertServiceService, useClass: MockAlertServiceService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

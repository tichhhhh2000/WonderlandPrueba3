import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibreriaPage } from './libreria.page';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

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
  consultarFavoritos(idUsuario: number) {
    console.log(`Favoritos consultados para usuario ${idUsuario}`);
  }

  fetchFavoritos() {
    return of([
      { id_favorito: 1, id_album: 1, nombre_album: 'Album 1', nombre_artista: 'Artista 1' },
      { id_favorito: 2, id_album: 2, nombre_album: 'Album 2', nombre_artista: 'Artista 2' },
    ]);
  }

  eliminarFavoritodeFavoritos(idFavorito: number) {
    console.log(`Favorito eliminado con ID ${idFavorito}`);
    return Promise.resolve();
  }

  mostrarCarrito(idUsuario: number) {
    console.log(`Carrito mostrado para usuario ${idUsuario}`);
    return Promise.resolve([
      { id_carrito: 1, id_album: 1, cantidad: 1 },
    ]);
  }

  agregarCarrito(idAlbum: number, idUsuario: number, cantidad: number) {
    console.log(`Álbum agregado al carrito: ID ${idAlbum}, Usuario ${idUsuario}, Cantidad ${cantidad}`);
    return Promise.resolve();
  }

  actualizarCantidad(cantidad: number, idCarrito: number) {
    console.log(`Cantidad actualizada a ${cantidad} para el carrito con ID ${idCarrito}`);
    return Promise.resolve();
  }
}

// Mock para AlertServiceService
class MockAlertServiceService {
  GenerarAlerta(header: string, message: string) {
    console.log(`Alerta: ${header} - ${message}`);
  }
}

// Mock para ToastServiceService
class MockToastServiceService {
  GenerarToast(message: string, duration: number, position: string) {
    console.log(`Toast: ${message} - Duración: ${duration} - Posición: ${position}`);
  }
}

// Mock para Router
class MockRouter {
  navigate(commands: any[], extras?: any) {
    console.log(`Navegando a: ${commands} con extras:`, extras);
  }
}

describe('LibreriaPage', () => {
  let component: LibreriaPage;
  let fixture: ComponentFixture<LibreriaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibreriaPage],
      imports: [HttpClientTestingModule], // Importa el módulo de pruebas de HttpClient
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: NativeStorage, useClass: MockNativeStorage },
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: AlertServiceService, useClass: MockAlertServiceService },
        { provide: ToastServiceService, useClass: MockToastServiceService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LibreriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoPage } from './carrito.page';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { ActivatedRoute } from '@angular/router';
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
  mostrarCarrito(idusuario: number) {
    console.log(`Simulación de mostrarCarrito para usuario ${idusuario}`);
    return Promise.resolve();
  }

  fetchCarrito() {
    return of([
      { id_album: 1, nombre_album: 'Album 1', cantidad: 1, precio_album: 1000 },
      { id_album: 2, nombre_album: 'Album 2', cantidad: 2, precio_album: 2000 },
    ]);
  }

  traerUsuario(idusuario: number) {
    return Promise.resolve({ usuario: 'Test User', correo_usuario: 'test@example.com' });
  }

  registrarVenta(idusuario: number, total: number, carrito: any[]) {
    console.log(`Venta registrada para usuario ${idusuario} con total ${total}`);
    return Promise.resolve();
  }

  vaciarCarrito(idusuario: number) {
    console.log(`Carrito vaciado para usuario ${idusuario}`);
    return Promise.resolve();
  }

  eliminarCarrito(id_carrito: number) {
    console.log(`Artículo eliminado del carrito con ID ${id_carrito}`);
    return Promise.resolve();
  }

  obtenerStockActual(id_album: number) {
    return Promise.resolve(10); // Simula que siempre hay 10 en stock
  }

  actualizarCantidad(cantidad: number, id_carrito: number) {
    console.log(`Cantidad actualizada a ${cantidad} para el carrito con ID ${id_carrito}`);
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

// Mock para ActivatedRoute
class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: (key: string) => 'mock-param',
    },
  };
}

describe('CarritoPage', () => {
  let component: CarritoPage;
  let fixture: ComponentFixture<CarritoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarritoPage],
      imports: [HttpClientTestingModule], // Importa el módulo de pruebas de HttpClient
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: NativeStorage, useClass: MockNativeStorage },
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: AlertServiceService, useClass: MockAlertServiceService },
        { provide: ToastServiceService, useClass: MockToastServiceService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

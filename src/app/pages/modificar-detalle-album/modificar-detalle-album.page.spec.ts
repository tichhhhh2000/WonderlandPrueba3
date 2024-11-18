import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarDetalleAlbumPage } from './modificar-detalle-album.page';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { of } from 'rxjs';

// Mock para ServicebdService
class MockServicebdService {
  consultarProducto() {
    console.log('Mock: consultarProducto ejecutado');
  }

  dbState() {
    return of(true); // Simula que la base de datos está lista
  }

  fetchProducto() {
    return of([
      {
        id_album: 1,
        nombre_artista: 'Mock Artista',
        nombre_album: 'Mock Album',
        detalle_album: 'Detalle de prueba',
        precio_album: 10000,
        portada_album: null,
        stock: 10,
      },
    ]);
  }

  modificarProducto(id: number, artista: string, album: string, detalle: string, precio: number, portada: string | null, stock: number) {
    console.log('Mock: modificarProducto ejecutado', { id, artista, album, detalle, precio, portada, stock });
    return Promise.resolve(true); // Simula una modificación exitosa
  }
}

// Mock para ToastServiceService
class MockToastServiceService {
  GenerarToast(mensaje: string, duracion: number, posicion: string) {
    console.log(`Mock Toast: ${mensaje} (${duracion}ms, posición: ${posicion})`);
  }
}

// Mock para AlertServiceService
class MockAlertServiceService {
  GenerarAlerta(titulo: string, mensaje: string) {
    console.log(`Mock Alerta: ${titulo} - ${mensaje}`);
  }
}

// Mock para Router
class MockRouter {
  navigate(commands: any[]) {
    console.log(`Mock Router: Navegando a ${commands}`);
  }
}

describe('ModificarDetalleAlbumPage', () => {
  let component: ModificarDetalleAlbumPage;
  let fixture: ComponentFixture<ModificarDetalleAlbumPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarDetalleAlbumPage],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: ToastServiceService, useClass: MockToastServiceService },
        { provide: AlertServiceService, useClass: MockAlertServiceService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarDetalleAlbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

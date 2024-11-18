import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarAlbumPage } from './eliminar-album.page';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { of } from 'rxjs';

// Mock para ServicebdService
class MockServicebdService {
  consultarProducto() {
    console.log('Mock: consultarProducto ejecutado');
    return Promise.resolve();
  }

  fetchProducto() {
    return of([
      { id_album: 1, nombre_album: 'Mock Album 1', nombre_artista: 'Mock Artista', visible: 1 },
      { id_album: 2, nombre_album: 'Mock Album 2', nombre_artista: 'Otro Artista', visible: 1 },
    ]);
  }

  ocultarProducto(id_album: number) {
    console.log(`Mock: ocultarProducto ejecutado para id_album ${id_album}`);
    return Promise.resolve(true); // Simula éxito
  }

  mostrarProducto(id_album: number) {
    console.log(`Mock: mostrarProducto ejecutado para id_album ${id_album}`);
    return Promise.resolve(true); // Simula éxito
  }
}

// Mock para ToastServiceService
class MockToastServiceService {
  GenerarToast(mensaje: string, duracion: number, posicion: string) {
    console.log(`Mock Toast: ${mensaje} (${duracion}ms, posición: ${posicion})`);
  }
}

// Mock para Router
class MockRouter {
  navigate(commands: any[]) {
    console.log(`Mock Router: Navegando a ${commands}`);
  }
}

describe('EliminarAlbumPage', () => {
  let component: EliminarAlbumPage;
  let fixture: ComponentFixture<EliminarAlbumPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminarAlbumPage],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: ToastServiceService, useClass: MockToastServiceService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EliminarAlbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
});

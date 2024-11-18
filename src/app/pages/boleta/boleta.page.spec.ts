import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoletaPage } from './boleta.page';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

// Mock para Router
class MockRouter {
  navigate(commands: any[]) {
    console.log(`Navegando a: ${commands}`);
  }
}

// Mock para ServicebdService
class MockServicebdService {
  getLastVentaId() {
    console.log('Obteniendo el último ID de venta');
    return 1; // Simula un ID de venta
  }

  obtenerDetallesVenta(idVenta: number) {
    console.log(`Obteniendo detalles de la venta con ID ${idVenta}`);
    return Promise.resolve({
      usuario: { nombre: 'Usuario Mock', correo: 'usuario@mock.com' },
      total: 5000,
      albums: [
        { id_album: 1, nombre_album: 'Album 1', cantidad: 2, precio: 2000 },
        { id_album: 2, nombre_album: 'Album 2', cantidad: 1, precio: 3000 },
      ],
    });
  }
}

describe('BoletaPage', () => {
  let component: BoletaPage;
  let fixture: ComponentFixture<BoletaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoletaPage],
      imports: [HttpClientTestingModule], // Importa el módulo de pruebas para HttpClient
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: ServicebdService, useClass: MockServicebdService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BoletaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

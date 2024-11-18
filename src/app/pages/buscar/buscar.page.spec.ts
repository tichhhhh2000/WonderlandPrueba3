import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarPage } from './buscar.page';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock para ServicebdService
class MockServicebdService {
  consultarProducto() {
    // Simula la consulta de productos
    console.log('Simulación de consulta de productos');
  }

  fetchProducto() {
    return {
      subscribe: (callback: any) => {
        callback([
          { id: 1, nombre_album: 'Album 1', nombre_artista: 'Artista 1' },
          { id: 2, nombre_album: 'Album 2', nombre_artista: 'Artista 2' },
        ]);
      },
    }; // Simula la suscripción a productos
  }
}

// Mock para Router
class MockRouter {
  navigate(commands: any[]) {
    // Simula la navegación
    console.log(`Navegando a: ${commands}`);
  }
}

describe('BuscarPage', () => {
  let component: BuscarPage;
  let fixture: ComponentFixture<BuscarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscarPage],
      imports: [HttpClientTestingModule], // Importa el módulo de pruebas de HttpClient
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: ServicebdService, useClass: MockServicebdService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

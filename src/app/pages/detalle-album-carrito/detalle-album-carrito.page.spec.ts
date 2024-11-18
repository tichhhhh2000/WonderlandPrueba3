import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleAlbumCarritoPage } from './detalle-album-carrito.page';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { of } from 'rxjs';

// Mock para ActivatedRoute
class MockActivatedRoute {
  params = of({ id: 1 }); // Simula parámetros de ruta
}

// Mock para Router
class MockRouter {
  navigate(commands: any[]) {
    // Simula la navegación
    console.log(`Navegando a: ${commands}`);
  }
}

// Mock para AlertServiceService
class MockAlertServiceService {
  GenerarAlerta(header: string, message: string) {
    // Simula la generación de una alerta
    console.log(`Alerta: ${header} - ${message}`);
  }
}

describe('DetalleAlbumCarritoPage', () => {
  let component: DetalleAlbumCarritoPage;
  let fixture: ComponentFixture<DetalleAlbumCarritoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleAlbumCarritoPage],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter },
        { provide: AlertServiceService, useClass: MockAlertServiceService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleAlbumCarritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});


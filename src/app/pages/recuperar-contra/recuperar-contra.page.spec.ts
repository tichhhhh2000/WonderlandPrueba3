import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarContraPage } from './recuperar-contra.page';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { of } from 'rxjs';

// Mock para ActivatedRoute
class MockActivatedRoute {
  queryParams = of({ correo: 'mock@correo.com' }); // Simula un parámetro de consulta
}

// Mock para Router
class MockRouter {
  navigate(commands: any[]) {
    console.log(`Navegando a: ${commands}`);
  }
}

// Mock para ServicebdService
class MockServicebdService {
  obtenerIdPorCorreo(correo: string) {
    return Promise.resolve(1); // Devuelve un ID de usuario simulado
  }
  actualizarContrasena(idUsuario: number, nuevaContrasena: string) {
    return Promise.resolve(true); // Simula una actualización exitosa
  }
}

// Mock para AlertServiceService
class MockAlertServiceService {
  GenerarAlerta(header: string, message: string) {
    console.log(`Alerta generada: ${header} - ${message}`);
  }
}

describe('RecuperarContraPage', () => {
  let component: RecuperarContraPage;
  let fixture: ComponentFixture<RecuperarContraPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperarContraPage],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter },
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: AlertServiceService, useClass: MockAlertServiceService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

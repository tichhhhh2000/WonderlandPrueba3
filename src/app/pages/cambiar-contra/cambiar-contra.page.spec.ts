import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarContraPage } from './cambiar-contra.page';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { of } from 'rxjs';

// Mock para ActivatedRoute
class MockActivatedRoute {
  queryParams = of({ correo: 'usuario@correo.com' }); // Simula los parámetros de la URL
}

// Mock para Router
class MockRouter {
  navigate(commands: any[]) {
    console.log(`Mock Router: Navegando a ${commands}`);
  }
}

// Mock para ServicebdService
class MockServicebdService {
  obtenerIdPorCorreo(correo: string) {
    console.log(`Mock: obteniendo ID para correo ${correo}`);
    return Promise.resolve(1); // Simula el ID de usuario
  }

  consultarUsuarioPorID(idUsuario: number, contrasena: string) {
    console.log(`Mock: verificando contraseña para usuario ${idUsuario}`);
    return Promise.resolve(contrasena === 'contrasenaActual'); // Simula validación de contraseña
  }

  actualizarContrasena(idUsuario: number, nuevaContrasena: string) {
    console.log(`Mock: actualizando contraseña para usuario ${idUsuario}`);
    return Promise.resolve(true); // Simula éxito en la actualización
  }
}

// Mock para AlertServiceService
class MockAlertServiceService {
  GenerarAlerta(titulo: string, mensaje: string) {
    console.log(`Mock Alert: ${titulo} - ${mensaje}`);
  }
}

describe('CambiarContraPage', () => {
  let component: CambiarContraPage;
  let fixture: ComponentFixture<CambiarContraPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CambiarContraPage],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter },
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: AlertServiceService, useClass: MockAlertServiceService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CambiarContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarPerfilPage } from './modificar-perfil.page';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { of } from 'rxjs';

// Mock para ActivatedRoute
class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: (key: string) => '1', // Simula el ID del usuario en la ruta
    },
  };
}

// Mock para ServicebdService
class MockServicebdService {
  traerUsuario(id: number) {
    return Promise.resolve({
      usuario: 'MockUser',
      correo_usuario: 'mockuser@example.com',
      direccion: 'Mock Address',
    });
  }

  modificarUsuario(id: number, usuario: string, direccion: string) {
    return Promise.resolve(true); // Simula una modificación exitosa
  }

  obtenerPreguntaSeguridad(correo: string) {
    return Promise.resolve('¿Cuál es el nombre de tu mascota?');
  }

  verificarRespuestaSeguridad(correo: string, respuesta: string) {
    return Promise.resolve(respuesta === 'MockRespuesta'); // Simula una respuesta correcta
  }
}

// Mock para AlertServiceService
class MockAlertServiceService {
  GenerarAlerta(titulo: string, mensaje: string) {
    console.log(`${titulo}: ${mensaje}`);
  }

  GenerarAlertaPrompt(titulo: string, mensaje: string, callback: (respuesta: string) => void) {
    console.log(`${titulo}: ${mensaje}`);
    callback('MockRespuesta'); // Simula que el usuario ingresó una respuesta correcta
  }
}

// Mock para Router
class MockRouter {
  navigate(commands: any[], extras?: any) {
    console.log(`Navegando a: ${commands} con extras:`, extras);
  }
}

describe('ModificarPerfilPage', () => {
  let component: ModificarPerfilPage;
  let fixture: ComponentFixture<ModificarPerfilPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarPerfilPage],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: AlertServiceService, useClass: MockAlertServiceService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

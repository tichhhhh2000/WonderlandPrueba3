import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarsePage } from './registrarse.page';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, BehaviorSubject } from 'rxjs';

// Mock para Router
class MockRouter {
  navigate(commands: any[], extras?: any) {
    console.log(`Navegando a: ${commands} con extras:`, extras);
  }
}

// Mock para ServicebdService
class MockServicebdService {
  private usuarios = new BehaviorSubject([
    { username: 'testuser', email: 'testuser@test.com', password: 'Password123!' },
  ]);

  verificarUsuarioCorreo(username: string, email: string) {
    const usuarioExiste = this.usuarios.value.some(
      (user) => user.username === username || user.email === email
    );
    return Promise.resolve(usuarioExiste);
  }

  insertarUsuario(username: string, email: string, password: string, direccion: string, respuestaSeguridad: string) {
    console.log('Insertando usuario:', { username, email, password, direccion, respuestaSeguridad });
    return Promise.resolve(true);
  }
}

// Mock para AlertServiceService
class MockAlertServiceService {
  GenerarAlerta(titulo: string, mensaje: string) {
    console.log(`Alerta generada - Título: ${titulo}, Mensaje: ${mensaje}`);
  }
}

// Mock para ToastServiceService
class MockToastServiceService {
  GenerarToast(mensaje: string, duracion: number, posicion: string) {
    console.log(`Toast generado - Mensaje: ${mensaje}, Duración: ${duracion}, Posición: ${posicion}`);
  }
}

describe('RegistrarsePage', () => {
  let component: RegistrarsePage;
  let fixture: ComponentFixture<RegistrarsePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarsePage],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: AlertServiceService, useClass: MockAlertServiceService },
        { provide: ToastServiceService, useClass: MockToastServiceService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debería mostrar un error si el formulario está vacío', () => {
    // Configura los campos del componente como vacíos
    component.username = '';
    component.email = '';
    component.password = '';
    component.password2 = '';

    // Espía la función de alerta para verificar si se llama
    const alertSpy = spyOn(component['alerta'], 'GenerarAlerta');

    // Llama al método de validación
    component.validacion();

    // Verifica si se generó la alerta con el mensaje esperado
    expect(alertSpy).toHaveBeenCalledWith('Error', 'Rellene todos los campos');
  });
});

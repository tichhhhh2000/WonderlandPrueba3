import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router, ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

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
      get: (key: string) => {
        console.log(`Parámetro solicitado: ${key}`);
        return null;
      },
    },
  };
}

// Mock para NativeStorage
class MockNativeStorage {
  private storage: { [key: string]: any } = {};

  setItem(key: string, value: any) {
    this.storage[key] = value;
    return Promise.resolve(value);
  }

  getItem(key: string) {
    if (this.storage[key]) {
      return Promise.resolve(this.storage[key]);
    } else {
      return Promise.reject({ code: 2, message: 'No existe el item' });
    }
  }
}

// Mock para AlertServiceService
class MockAlertServiceService {
  GenerarAlerta(header: string, message: string) {
    console.log(`Alerta: ${header} - ${message}`);
  }
}

// Mock para ServicebdService
class MockServicebdService {
  consultarUsuarioPorCorreo(email: string, password: string) {
    console.log(`Consulta usuario con email: ${email} y password: ${password}`);
    if (email === 'admin@example.com' && password === 'admin') {
      return Promise.resolve({ id_usuario: 1, id_rol: 1 }); // Usuario administrador
    }
    if (email === 'user@example.com' && password === 'user') {
      return Promise.resolve({ id_usuario: 2, id_rol: 2 }); // Usuario estándar
    }
    return Promise.resolve(null); // Usuario no encontrado
  }
}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [HttpClientTestingModule], // Importa el módulo de pruebas para HttpClient
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: NativeStorage, useClass: MockNativeStorage },
        { provide: AlertServiceService, useClass: MockAlertServiceService },
        { provide: ServicebdService, useClass: MockServicebdService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar error si ambos campos están vacíos', () => {
    // Configurar espía para el servicio de alertas
    const alertaSpy = spyOn(
      TestBed.inject(AlertServiceService),
      'GenerarAlerta'
    );

    // Caso: Ambos campos vacíos
    component.email = '';
    component.password = '';
    component.iniciarSesion();

    // Verificar que se llama a la alerta con el mensaje correcto
    expect(alertaSpy).toHaveBeenCalledWith('Error', 'Rellene los campos');
  });
});


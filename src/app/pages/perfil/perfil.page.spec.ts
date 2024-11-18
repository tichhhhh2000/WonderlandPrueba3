import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { CamaraService } from 'src/app/services/camara.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { of } from 'rxjs';

// Mock para Router
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

// Mock para ServicebdService
class MockServicebdService {
  traerUsuario(id: number) {
    return Promise.resolve({
      usuario: 'Mock Usuario',
      correo_usuario: 'mock@correo.com',
      direccion: 'Mock Dirección',
      foto_perfil: 'assets/icon/mock-foto.jpg',
    });
  }

  actualizarFotoPerfil(id: number, foto: string) {
    return Promise.resolve(true);
  }
}

// Mock para NativeStorage
class MockNativeStorage {
  getItem(key: string) {
    return Promise.resolve(1); // Simula un ID de usuario
  }
}

// Mock para AlertServiceService
class MockAlertServiceService {
  GenerarAlerta(titulo: string, mensaje: string) {
    console.log(`${titulo}: ${mensaje}`);
  }
}

// Mock para CamaraService
class MockCamaraService {
  tomarFoto() {
    return Promise.resolve('data:image/png;base64,mock-foto');
  }
}

// Mock para ToastServiceService
class MockToastServiceService {
  GenerarToast(mensaje: string, duracion: number, posicion: string) {
    console.log(`Toast: ${mensaje}`);
  }
}

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilPage],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: AlertServiceService, useClass: MockAlertServiceService },
        { provide: CamaraService, useClass: MockCamaraService },
        { provide: ToastServiceService, useClass: MockToastServiceService },
        { provide: NativeStorage, useClass: MockNativeStorage },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

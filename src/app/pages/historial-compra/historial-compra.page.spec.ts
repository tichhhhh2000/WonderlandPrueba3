import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialCompraPage } from './historial-compra.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { of, BehaviorSubject } from 'rxjs';

// Mock para NativeStorage
class MockNativeStorage {
  private storage = new Map<string, any>();

  getItem(key: string) {
    if (this.storage.has(key)) {
      return Promise.resolve(this.storage.get(key));
    }
    return Promise.reject('Item not found');
  }

  setItem(key: string, value: any) {
    this.storage.set(key, value);
    return Promise.resolve();
  }
}

// Mock para ServicebdService
class MockServicebdService {
  private historialCompras = [
    { id: 1, producto: 'Producto 1', cantidad: 2, precio: 100 },
    { id: 2, producto: 'Producto 2', cantidad: 1, precio: 50 },
  ];

  consultarHistorialComprasPorUsuario(idUsuario: number) {
    console.log(`Consultando historial de compras para el usuario: ${idUsuario}`);
    return Promise.resolve(this.historialCompras);
  }
}

// Mock para AlertServiceService
class MockAlertServiceService {
  GenerarAlerta(titulo: string, mensaje: string) {
    console.log(`Alerta generada - Título: ${titulo}, Mensaje: ${mensaje}`);
  }
}

describe('HistorialCompraPage', () => {
  let component: HistorialCompraPage;
  let fixture: ComponentFixture<HistorialCompraPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialCompraPage],
      providers: [
        { provide: NativeStorage, useClass: MockNativeStorage },
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: AlertServiceService, useClass: MockAlertServiceService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialCompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

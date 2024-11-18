import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HistorialVentaPage } from './historial-venta.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

// Mock para ServicebdService
class MockServicebdService {
  obtenerHistorialVentas() {
    console.log('Obteniendo historial de ventas...');
    return Promise.resolve([
      {
        id_venta: 1,
        fecha_venta: '2024-11-01',
        total_venta: 50000,
        comprador: 'Cliente 1',
        cantidad: 3,
        id_album: 101,
        nombre_artista: 'Mock Artista',
        nombre_album: 'Mock Album',
        precio_album: 20000,
        portada_album: 'assets/mock-image.jpg',
      },
    ]);
  }
}

describe('HistorialVentaPage', () => {
  let component: HistorialVentaPage;
  let fixture: ComponentFixture<HistorialVentaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialVentaPage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialVentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { HomePage } from './home.page';
import { Router } from '@angular/router';
import { ServicebdService } from '../services/servicebd.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, Subject } from 'rxjs';

// Mock para Router
class MockRouter {
  navigate(commands: any[], extras?: any) {
    console.log(`Navegando a: ${commands} con extras:`, extras);
  }
}

// Mock para NavController
class MockNavController {
  navigateForward(url: string) {
    console.log(`Navegando con NavController a: ${url}`);
  }
}

// Mock para ServicebdService
class MockServicebdService {
  private stockCambiadoSubject = new Subject<void>();
  stockCambiado$ = this.stockCambiadoSubject.asObservable();

  consultarProducto() {
    console.log('Consultando productos en la base de datos');
  }

  dbState() {
    return of(true); // Simula que la base de datos está lista
  }

  fetchProducto() {
    return of([
      { id_producto: 1, nombre_album: 'Mock Album 1', stock: 10 },
      { id_producto: 2, nombre_album: 'Mock Album 2', stock: 5 },
    ]);
  }

  notificarCambioStock() {
    this.stockCambiadoSubject.next();
  }
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: NavController, useClass: MockNavController },
        { provide: ServicebdService, useClass: MockServicebdService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

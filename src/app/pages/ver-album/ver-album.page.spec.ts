import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerAlbumPage } from './ver-album.page';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, BehaviorSubject } from 'rxjs';

// Mock para ServicebdService
class MockServicebdService {
  private dbReady = new BehaviorSubject(true); // Simula el estado de la base de datos

  dbState() {
    return this.dbReady.asObservable();
  }

  consultarProducto() {
    // Simula la consulta de productos
    console.log('Simulación de consulta de productos');
  }

  fetchProducto() {
    return of([
      { id: 1, nombre_album: 'Album 1', nombre_artista: 'Artista 1' },
      { id: 2, nombre_album: 'Album 2', nombre_artista: 'Artista 2' },
    ]); // Simula la lista de productos
  }
}

// Mock para Router
class MockRouter {
  navigate(commands: any[]) {
    // Simula la navegación
    console.log(`Navegando a: ${commands}`);
  }
}

describe('VerAlbumPage', () => {
  let component: VerAlbumPage;
  let fixture: ComponentFixture<VerAlbumPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerAlbumPage],
      imports: [HttpClientTestingModule], // Importa el módulo de pruebas de HttpClient
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: ServicebdService, useClass: MockServicebdService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VerAlbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});

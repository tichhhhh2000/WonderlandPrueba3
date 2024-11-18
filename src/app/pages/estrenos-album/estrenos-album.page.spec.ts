import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstrenosAlbumPage } from './estrenos-album.page';
import { EstrenoService } from 'src/app/services/estreno.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

// Mock para EstrenoService
class MockEstrenoService {
  getEstrenos() {
    return of([
      { id: 1, nombre: 'Album 1', artista: 'Artista 1', lanzamiento: '2023-01-01' },
      { id: 2, nombre: 'Album 2', artista: 'Artista 2', lanzamiento: '2023-02-01' },
    ]); // Simula una respuesta de la API
  }
}

describe('EstrenosAlbumPage', () => {
  let component: EstrenosAlbumPage;
  let fixture: ComponentFixture<EstrenosAlbumPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstrenosAlbumPage],
      imports: [HttpClientTestingModule], // Importa el módulo de pruebas para HttpClient
      providers: [
        { provide: EstrenoService, useClass: MockEstrenoService }, // Usa el mock del servicio
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EstrenosAlbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
});

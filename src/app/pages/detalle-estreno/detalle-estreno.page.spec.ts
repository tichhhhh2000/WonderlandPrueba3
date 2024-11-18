import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleEstrenoPage } from './detalle-estreno.page';
import { ActivatedRoute } from '@angular/router';
import { EstrenoService } from 'src/app/services/estreno.service';
import { of } from 'rxjs';

// Mock para ActivatedRoute
class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: (key: string) => '1', // Simula el parámetro 'id' con un valor de '1'
    },
  };
}

// Mock para EstrenoService
class MockEstrenoService {
  getEstrenoById(id: number) {
    console.log(`Mock service: fetching estreno with id ${id}`);
    return of({
      id: id,
      nombre: 'Mock Estreno',
      artista: 'Mock Artista',
      lanzamiento: '2024-01-01',
    }); // Devuelve un observable con datos simulados
  }
}

describe('DetalleEstrenoPage', () => {
  let component: DetalleEstrenoPage;
  let fixture: ComponentFixture<DetalleEstrenoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleEstrenoPage],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: EstrenoService, useClass: MockEstrenoService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleEstrenoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

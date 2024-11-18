import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumComponent } from './detalle-album.page'; // Ajusta el nombre a AlbumComponent si es necesario

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumComponent] // Asegúrate de declarar correctamente el componente aquí
    });

    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarDetalleAlbumPage } from './modificar-detalle-album.page';

describe('ModificarDetalleAlbumPage', () => {
  let component: ModificarDetalleAlbumPage;
  let fixture: ComponentFixture<ModificarDetalleAlbumPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarDetalleAlbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleAlbumCarritoPage } from './detalle-album-carrito.page';

describe('DetalleAlbumCarritoPage', () => {
  let component: DetalleAlbumCarritoPage;
  let fixture: ComponentFixture<DetalleAlbumCarritoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAlbumCarritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

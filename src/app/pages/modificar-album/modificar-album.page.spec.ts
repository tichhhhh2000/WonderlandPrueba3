import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarAlbumPage } from './modificar-album.page';

describe('ModificarAlbumPage', () => {
  let component: ModificarAlbumPage;
  let fixture: ComponentFixture<ModificarAlbumPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarAlbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

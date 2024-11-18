import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarAlbumPage } from './agregar-album.page';

describe('AgregarAlbumPage', () => {
  let component: AgregarAlbumPage;
  let fixture: ComponentFixture<AgregarAlbumPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAlbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

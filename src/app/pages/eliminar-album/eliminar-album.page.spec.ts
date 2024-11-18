import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarAlbumPage } from './eliminar-album.page';

describe('EliminarAlbumPage', () => {
  let component: EliminarAlbumPage;
  let fixture: ComponentFixture<EliminarAlbumPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarAlbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

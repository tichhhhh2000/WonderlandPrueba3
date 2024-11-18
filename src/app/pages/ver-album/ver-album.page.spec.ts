import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerAlbumPage } from './ver-album.page';

describe('VerAlbumPage', () => {
  let component: VerAlbumPage;
  let fixture: ComponentFixture<VerAlbumPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAlbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

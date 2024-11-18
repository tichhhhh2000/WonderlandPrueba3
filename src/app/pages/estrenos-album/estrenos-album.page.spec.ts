import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstrenosAlbumPage } from './estrenos-album.page';

describe('EstrenosAlbumPage', () => {
  let component: EstrenosAlbumPage;
  let fixture: ComponentFixture<EstrenosAlbumPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstrenosAlbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

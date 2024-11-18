import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibreriaPage } from './libreria.page';

describe('LibreriaPage', () => {
  let component: LibreriaPage;
  let fixture: ComponentFixture<LibreriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LibreriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

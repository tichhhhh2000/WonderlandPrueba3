import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleLibreriaPage } from './detalle-libreria.page';

describe('DetalleLibreriaPage', () => {
  let component: DetalleLibreriaPage;
  let fixture: ComponentFixture<DetalleLibreriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleLibreriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

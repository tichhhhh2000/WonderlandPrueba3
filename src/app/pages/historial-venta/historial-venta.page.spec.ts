import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialVentaPage } from './historial-venta.page';

describe('HistorialVentaPage', () => {
  let component: HistorialVentaPage;
  let fixture: ComponentFixture<HistorialVentaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialVentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

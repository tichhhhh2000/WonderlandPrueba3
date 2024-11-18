import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleEstrenoPage } from './detalle-estreno.page';

describe('DetalleEstrenoPage', () => {
  let component: DetalleEstrenoPage;
  let fixture: ComponentFixture<DetalleEstrenoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEstrenoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

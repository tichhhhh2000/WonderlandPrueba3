import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarsePage } from './registrarse.page';

describe('RegistrarsePage', () => {
  let component: RegistrarsePage;
  let fixture: ComponentFixture<RegistrarsePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('debería validar correctamente el formulario del correo electrónico', () => {
    const correoValido = "usuario@example.com";
    const correoInvalido1 = "usuario@.com";
    const correoInvalido2 = "usuario.com";
    const correoInvalido3 = "usuario@com";
  
    expect(component.validarCorreo(correoValido)).toBeTrue();
    expect(component.validarCorreo(correoInvalido1)).toBeFalse();
    expect(component.validarCorreo(correoInvalido2)).toBeFalse();
    expect(component.validarCorreo(correoInvalido3)).toBeFalse();
  });
  

  it('debería validar correctamente el formulario de la contraseña', () => {
    const passwordValida = "Aa1!xyz";
    const passwordInvalida1 = "abcdef"; // Sin mayúsculas, números ni caracteres especiales
    const passwordInvalida2 = "ABCDEF"; // Sin minúsculas, números ni caracteres especiales
    const passwordInvalida3 = "Ab1";    // Longitud insuficiente
    const passwordInvalida4 = "Abcdef!"; // Sin números
  

    expect(component.validarPassword(passwordValida)).toBeTrue();
    expect(component.validarPassword(passwordInvalida1)).toBeFalse();
    expect(component.validarPassword(passwordInvalida2)).toBeFalse();
    expect(component.validarPassword(passwordInvalida3)).toBeFalse();
    expect(component.validarPassword(passwordInvalida4)).toBeFalse();
  });

  it('debería validar que las contraseñas coincidan', () => {
    component.password = "Password1!";
    component.password2 = "Password1!";
  
    expect(component.password === component.password2).toBeTrue();
    component.password2 = "Password2!";
    expect(component.password === component.password2).toBeFalse();
  });  
  
  
});

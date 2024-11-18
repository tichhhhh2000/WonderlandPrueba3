import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarPage } from './recuperar.page';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { of } from 'rxjs';

describe('RecuperarPage', () => {
  let component: RecuperarPage;
  let fixture: ComponentFixture<RecuperarPage>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockServicebd: jasmine.SpyObj<ServicebdService>;
  let mockAlertService: jasmine.SpyObj<AlertServiceService>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockServicebd = jasmine.createSpyObj('ServicebdService', ['verificarRespuestaSeguridad']);
    mockAlertService = jasmine.createSpyObj('AlertServiceService', ['GenerarAlerta']);

    TestBed.configureTestingModule({
      declarations: [RecuperarPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ServicebdService, useValue: mockServicebd },
        { provide: AlertServiceService, useValue: mockAlertService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería verificar una respuesta correcta y redirigir', async () => {
    mockServicebd.verificarRespuestaSeguridad.and.returnValue(Promise.resolve(true));
    component.correo = 'test@example.com';
    component.respuesta = 'respuesta correcta';

    await component.verificarRespuesta();

    expect(mockServicebd.verificarRespuestaSeguridad).toHaveBeenCalledWith(
      'test@example.com',
      'respuesta correcta'
    );
    expect(mockAlertService.GenerarAlerta).toHaveBeenCalledWith(
      'Éxito',
      'Respuesta correcta. Redirigiendo a cambio de contraseña...'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/recuperar-contra'], {
      queryParams: { correo: 'test@example.com' },
    });
  });
});

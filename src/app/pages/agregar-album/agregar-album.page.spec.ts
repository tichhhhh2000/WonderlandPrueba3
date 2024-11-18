import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarAlbumPage } from './agregar-album.page';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { CamaraService } from 'src/app/services/camara.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AgregarAlbumPage', () => {
  let component: AgregarAlbumPage;
  let fixture: ComponentFixture<AgregarAlbumPage>;
  let alertServiceMock: any;

  beforeEach(async () => {
    alertServiceMock = jasmine.createSpyObj('AlertServiceService', ['GenerarAlerta']);
    const toastServiceMock = jasmine.createSpyObj('ToastServiceService', ['GenerarToast']);
    const cameraServiceMock = jasmine.createSpyObj('CamaraService', ['tomarFoto']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const alertControllerMock = jasmine.createSpyObj('AlertController', ['create']);
    const servicebdMock = jasmine.createSpyObj('ServicebdService', ['insertarProducto']);

    await TestBed.configureTestingModule({
      declarations: [AgregarAlbumPage],
      providers: [
        { provide: AlertServiceService, useValue: alertServiceMock },
        { provide: ToastServiceService, useValue: toastServiceMock },
        { provide: CamaraService, useValue: cameraServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: AlertController, useValue: alertControllerMock },
        { provide: ServicebdService, useValue: servicebdMock },
        { provide: SQLite, useValue: {} }, // Mock de SQLite
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAlbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debería mostrar una alerta si "nombreArtista" está vacío', async () => {
    component.nombreArtista = ''; // Dejar el campo vacío
    await component.validacion(); // Ejecutar la validación
    expect(alertServiceMock.GenerarAlerta).toHaveBeenCalledWith('Error', 'El campo "Nombre Artista" está vacío.');
  });
});

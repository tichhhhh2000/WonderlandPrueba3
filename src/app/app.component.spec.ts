import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { LocalNotifications } from '@capacitor/local-notifications';
import { AppComponent } from './app.component';
import { ToastServiceService } from './services/toast-service.service';

// Mock para Router
class MockRouter {
  navigate(commands: any[]) {
    console.log(`Navegando a: ${commands}`);
  }
}

// Mock para MenuController
class MockMenuController {
  close() {
    console.log('Menú cerrado');
    return Promise.resolve();
  }
}

// Mock para NativeStorage
class MockNativeStorage {
  private storage: { [key: string]: any } = {};

  remove(key: string) {
    if (this.storage[key]) {
      delete this.storage[key];
      return Promise.resolve();
    } else {
      return Promise.reject({ code: 2, message: 'No existe el item' });
    }
  }
}

// Mock para ToastServiceService
class MockToastServiceService {
  GenerarToast(message: string, duration: number, position: string) {
    console.log(`Toast: ${message} - Duración: ${duration} - Posición: ${position}`);
  }
}

// Mock para LocalNotifications
class MockLocalNotifications {
  static requestPermissions() {
    return Promise.resolve({ display: 'granted' });
  }

  static schedule(options: any) {
    console.log('Notificación programada:', options);
    return Promise.resolve();
  }

  static cancel(options: any) {
    console.log('Notificación cancelada:', options);
    return Promise.resolve();
  }
}

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: MenuController, useClass: MockMenuController },
        { provide: NativeStorage, useClass: MockNativeStorage },
        { provide: ToastServiceService, useClass: MockToastServiceService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});

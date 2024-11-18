import { TestBed } from '@angular/core/testing';
import { ServicebdService } from './servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { AlertServiceService } from './alert-service.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

// Mock para SQLite
class MockSQLite {
  create() {
    return Promise.resolve({
      executeSql: (query: string, params: any[]) => Promise.resolve({ rows: { length: 0 } }),
    });
  }
}

// Mock para Platform
class MockPlatform {
  ready() {
    return Promise.resolve();
  }
}

// Mock para AlertServiceService
class MockAlertServiceService {
  GenerarAlerta(header: string, message: string) {
    console.log(`Alerta generada: ${header} - ${message}`);
  }
}

// Mock para NativeStorage
class MockNativeStorage {
  private storage: { [key: string]: any } = {};

  getItem(key: string) {
    if (this.storage[key]) {
      return Promise.resolve(this.storage[key]);
    } else {
      return Promise.reject({ code: 2, message: 'No existe el item' });
    }
  }

  setItem(key: string, value: any) {
    this.storage[key] = value;
    return Promise.resolve(value);
  }

  remove(key: string) {
    delete this.storage[key];
    return Promise.resolve();
  }
}

describe('ServicebdService', () => {
  let service: ServicebdService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ServicebdService,
        { provide: SQLite, useClass: MockSQLite },
        { provide: Platform, useClass: MockPlatform },
        { provide: AlertServiceService, useClass: MockAlertServiceService },
        { provide: NativeStorage, useClass: MockNativeStorage },
      ],
    }).compileComponents();

    service = TestBed.inject(ServicebdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

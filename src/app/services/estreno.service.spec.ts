import { TestBed } from '@angular/core/testing';

import { EstrenoService } from './estreno.service';

describe('EstrenoService', () => {
  let service: EstrenoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstrenoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

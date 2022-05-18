import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { FakeValueService } from './fakeValueService';

describe('MasterService', () => {
  let service: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue', 'setValue']);
    TestBed.configureTestingModule({
      providers: [ MasterService,
        { provide: ValueService, useValue: spy }
      ]
    });
    service = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should return "My Value" from the real service', () => {
  //   const valueService = new ValueService();
  //   const masterService = new MasterService(valueService);
  //   expect(masterService.getValue()).toBe('My Value');
  // });

  // it('should return "other value" from fake object', () => {
  //   const fake = { getValue: () => 'fake from object' };
  //   const masterService = new MasterService(fake as ValueService);
  //   expect(masterService.getValue()).toBe('fake from object');
  // });

  // it('should return "other value" from fake service', () => {
  //   const fakeValueService = new FakeValueService();
  //   const masterService = new MasterService(fakeValueService as unknown as ValueService);
  //   expect(masterService.getValue()).toBe('Fake Value Service');
  // });

  it('should call getValue from spy of ValueService', () => {
    // const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    valueServiceSpy.getValue.and.returnValue('fake value');
    // const masterService = new MasterService(valueServiceSpy);
    expect(service.getValue()).toBe('fake value');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });


  it('should call setValue from spy of ValueService', () => {
    valueServiceSpy.getValue.and.returnValue('fake value');
    const masterService = new MasterService(valueServiceSpy);
    expect(masterService.getValue()).toBe('fake value');
    masterService.setValue('New Value')
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.setValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
    expect(valueServiceSpy.setValue).toHaveBeenCalledTimes(1);

  });


});

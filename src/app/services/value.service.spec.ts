import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService]
    });
    service = TestBed.inject(ValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for Get and set testing', () => {
    it('#GetValue, Should return "My Value"', () => {
      expect(service.getValue()).toBe('My Value');
    });

    it('#SetValue, Should return a new value', () => {
      const newValue = 'New Value';
      expect(service.getValue()).toBe('My Value');
      service.setValue(newValue)
      expect(service.getValue()).toBe(newValue);
    });
  })

  describe('Test for Promises', () => {
    it('#getPromiseValue with then, Should return a "Promise Value" from promise', (doneFn) => {
      const promiseValue = 'Promise Value';
      service.getPromiseValue().then((value) => {
        expect(value).toBe(promiseValue);
        doneFn();
      })
    })

    it('#getPromiseValue with async, Should return a "Promise Value" from promise', async () => {
      const promiseValue = 'Promise Value';
      const rta = await service.getPromiseValue();
      expect(rta).toBe(promiseValue);
    })
  })

  describe('Test for Observables', () => {
   it('#getObservableValue with subscribe, Should return a "Observable Value" from observable', (doneFn) => {
      const observableValue = 'Observable Value';
      service.getObservableValue().subscribe((value: string) => {
        expect(value).toBe(observableValue);
        doneFn();
      })
    })

    it('#getObservableValue with async, Should return a "Observable Value" from promise', async() => {
      const observableValue = 'Observable Value';
      const rta = await firstValueFrom(service.getObservableValue()) ;
      expect(rta).toBe(observableValue);
    })
  })
});

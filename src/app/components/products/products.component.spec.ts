import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { defer, of } from 'rxjs';
import { generateManyProducts } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/services/products.service';
import { ValueService } from 'src/app/services/value.service';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService : jasmine.SpyObj<ProductsService>;
  let valueService : jasmine.SpyObj<ValueService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getPromiseValue']);
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent, ProductsComponent ],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy },
        { provide: ValueService, useValue: valueServiceSpy }
      ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
    const productsMock = generateManyProducts(3);
    productService.getAll.and.returnValue(of(productsMock))
    fixture.detectChanges(); // ngOnInit

  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });

  describe('Test for getAllProducts', () => {
    it('Should return product list from service', () => {
      // Arrange
      const productsMock = generateManyProducts(10);
      productService.getAll.and.returnValue(of(productsMock));
      const countPrev = component.products.length;
      // Act
      component.getAllProducts();
      fixture.detectChanges();
      // Assert
      expect(component.products.length).toEqual(productsMock.length + countPrev);
    })

    it('Should change status "loading" to "success"', fakeAsync(() => {
      // Arrange
      const productsMock = generateManyProducts(1);

      productService.getAll.and.returnValue(defer(() => Promise.resolve(productsMock)));
      // Act
      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toEqual('loading');
      tick();
      fixture.detectChanges();
      // Assert
      expect(component.status).toEqual('success');
      flush();
    }))


    it('Should change status "loading" to "error"', fakeAsync(() => {
      // Arrange
      productService.getAll.and.returnValue(defer(() => Promise.reject('error')));
      const btnDebug = fixture.debugElement.query(By.css('.btn-products'));
      // Act
      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toEqual('loading');
      tick(3000);
      fixture.detectChanges();
      // Assert
      expect(component.status).toEqual('error');
    }))
  })

  describe('Test for callPromise', () => {
    it('Should call to promise',  async () => {
      // Arrange
      const promiseValue = 'My mock string';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(promiseValue));
      // Act
      await component.callPromise();
      fixture.detectChanges();
      // Assert
      expect(component.rta).toEqual(promiseValue);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    })

    it('Should show "My mock string" in <p> when button was clicked',  fakeAsync(() => {
      // Arrange
      const promiseValue = 'My mock string';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(promiseValue));
      const btnDebug = fixture.debugElement.query(By.css('.btn-promise'));

      // Act
      btnDebug.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      const parrafNativeElement = fixture.debugElement.query(By.css('.rta-parraf')).nativeElement;
      // Assert
      expect(parrafNativeElement?.textContent).toEqual(promiseValue);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    }))
  })
});

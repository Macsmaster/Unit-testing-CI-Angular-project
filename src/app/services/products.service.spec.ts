import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';
import { environment } from './../../environments/environment';
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';
import { HttpStatusCode } from '@angular/common/http';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be create', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpController.verify();
  });

  describe('Test for getAllSimple', () => {
    it('#getAllSimple, Should return products list', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts();
      // Act
      service.getAllSimple().subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        expect(data).toEqual(mockData);
        doneFn();
      });
      // http Config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(`${url}`);
      req.flush(mockData);
    });
  });

  describe('Test for getAll', () => {
    it('#getAll, Should return products list', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts();
      // Act
      service.getAll().subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });
      // http Config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(`${url}`);
      req.flush(mockData);
    });

    it('should return product list with query params limit 10 and offset 3', (doneFn) => {
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100,
        },
        {
          ...generateOneProduct(),
          price: 200,
        },
        {
          ...generateOneProduct(),
          price: 0,
        },
        {
          ...generateOneProduct(),
          price: -100,
        },
      ];
      // Act
      service.getAll().subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        doneFn();
      });
      // http Config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(`${url}`);
      req.flush(mockData);
    });


    it('#getAll, Should return products list', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts();
      const limit = 10;
      const offset = 3;
      // Act
      service.getAll(limit, offset).subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });
      // http Config
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(`${url}`);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
    });
  });

  describe('Test for getByCategory', () => {
    it('#getByCategory, Should return products by category with query params limit 10 and offset 3', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts();
      const categoryId = '1';
      const limit = 10;
      const offset = 3;
      // Act
      service.getByCategory(categoryId, limit, offset).subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });
      // http Config
      const url = `${environment.API_URL}/api/v1/categories/${categoryId}/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(`${url}`);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
      req.flush(mockData);
    });

    it('#getByCategory, Should return products by Category', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts();
      const categoryId = '1';
      // Act
      service.getByCategory(categoryId).subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });
      // http Config
      const url = `${environment.API_URL}/api/v1/categories/${categoryId}/products`;
      const req = httpController.expectOne(`${url}`);
      req.flush(mockData);
    });
  });

  describe('Test for getOne', () => {
    it('#getOne, Should return a products by id', (doneFn) => {
      // Arrange
      const productId = '1';
      const mockData = generateOneProduct();
      // Act
      service.getOne(productId).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      // http Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(`${url}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockData);
    });

    it('#getOne, Should return a error message when the status code is 404', (doneFn) => {
      // Arrange
      const productId = '1';
      const messageError = '404 message Error';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: messageError,
      };
      // Act
      service
        .getOne(productId)
        // .subscribe(null, () => {
        //   // Assert

        // }, () => { // Error

        // });

        .subscribe({
          error: (error) => {
            // Assert
            expect(error).toEqual('El producto no existe');
            doneFn();
          },
        });
      // http Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(`${url}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockError, mockError);
    });

    it('#getOne, Should return a error message when the status code is 409', (doneFn) => {
      // Arrange
      const productId = '1';
      const messageError = '409 message Error';
      const mockError = {
        status: HttpStatusCode.Conflict,
        statusText: messageError,
      };
      // Act
      service
        .getOne(productId)
        .subscribe({
          error: (error) => {
            // Assert
            expect(error).toEqual('Algo esta fallando en el server');
            doneFn();
          },
        });
      // http Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(`${url}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockError, mockError);
    });

    it('#getOne, Should return a error message when the status code is 401', (doneFn) => {
      // Arrange
      const productId = '1';
      const messageError = '401 message Error';
      const mockError = {
        status: HttpStatusCode.Unauthorized,
        statusText: messageError,
      };
      // Act
      service
        .getOne(productId)
        .subscribe({
          error: (error) => {
            // Assert
            expect(error).toEqual('No estas permitido');
            doneFn();
          },
        });
      // http Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(`${url}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockError, mockError);
    });

    it('#getOne, Should return a error message when exist an error', (doneFn) => {
      // Arrange
      const productId = '1';
      const messageError = '400 message Error';
      const mockError = {
        status: HttpStatusCode.BadRequest,
        statusText: messageError,
      };
      // Act
      service
        .getOne(productId)
        .subscribe({
          error: (error) => {
            // Assert
            expect(error).toEqual('Ups algo salio mal');
            doneFn();
          },
        });
      // http Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(`${url}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockError, mockError);
    });
  });

  describe('Test for create product', () => {
    it('#create, should create a product', (doneFn) => {
      // Arrange
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'New product',
        price: 1000,
        images: ['img'],
        description: 'This is a new product',
        categoryId: 12,
      };
      // Act
      service.create({ ...dto }).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      // http Config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(`${url}`);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
    });
  });

  describe('Test for update product', () => {
    it('#update, should update all properties of a product', (doneFn) => {
      // Arrange
      const mockData: Product = generateOneProduct();
      const productId = '1';
      const dto: UpdateProductDTO = {
        title: 'Product edited',
        price: 1000,
        images: ['img'],
        description: 'This is a product edited',
        categoryId: 12,
      };
      // Act
      service.update(productId, { ...dto }).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      // Http Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(`${url}`);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('PUT');
    });

    it('#update, should update title of a product', (doneFn) => {
      // Arrange
      const mockData: Product = generateOneProduct();
      const productId = '2';
      const dto: UpdateProductDTO = {
        title: 'Product title edited',
      };
      // Act
      service.update(productId, { ...dto }).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      // Http Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(`${url}`);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('PUT');
    });
  });

  describe('Test for delete product', () => {
    it('#Delete, should delete a product', (doneFn) => {
      // Arrange
      const productId = '1';
      // Act
      service.delete(productId).subscribe((data) => {
        // Assert
        expect(data).toBe(true);
        doneFn();
      });
      // Http Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(`${url}`);
      req.flush(true);
      expect(req.request.method).toEqual('DELETE');
    });
  });
});

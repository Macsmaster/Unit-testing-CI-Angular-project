import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Auth } from '../models/auth.model';
import { environment } from './../../environments/environment';
import { TokenService } from './token.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ AuthService, TokenService ]
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Login Testing', () => {
    it('should return a token', (doneFn) => {
      //Arrange
      const mockData: Auth = {
        access_token: '121212'
      };
      const email = 'nico@gmail.com';
      const password = '1212';
      //Act
      service.login(email, password)
      .subscribe((data)=> {
        //Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });


    it('should call to saveToken', (doneFn) => {
      //Arrange
      const mockData: Auth = {
        access_token: '121212'
      };
      const email = 'nico@gmail.com';
      const password = '1212';
      spyOn(tokenService, 'saveToken').and.callThrough();
      //Act
      service.login(email, password)
      .subscribe((data)=> {
        //Assert
        expect(data).toEqual(mockData);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledOnceWith('121212');
        doneFn();
      });
      // http config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    })
  })
});

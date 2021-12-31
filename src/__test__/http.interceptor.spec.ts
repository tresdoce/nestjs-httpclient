import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpService } from '../http/services/http.service';
import { HttpInterceptor } from '../http/interceptors/http.interceptor';
import { HttpModule } from '../http/http.module';
import { config } from './utils';

const executionContext: any = {
  switchToHttp: jest.fn().mockReturnThis(),
  getRequest: jest.fn().mockReturnThis(),
  getResponse: jest.fn().mockReturnThis(),
}

const callHandler: any = {
  handle: jest.fn()
}

describe('HttpInterceptor', () => {
  let app: INestApplication;
  let service: HttpService;
  let interceptor: HttpInterceptor<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config]
        }),
        HttpModule
      ]
    }).compile();
    app = module.createNestApplication();
    await app.init;

    service = module.get<HttpService>(HttpService);
    interceptor = new HttpInterceptor(service);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should be intercept and pass headers', async() => {
    await interceptor.intercept(executionContext, callHandler);
    expect(callHandler.handle).toBeCalledTimes(1);
  })
});

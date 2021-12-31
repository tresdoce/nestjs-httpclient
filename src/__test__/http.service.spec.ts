import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '../http/services/http.service';

import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './utils';
import { HttpModule } from '../http/http.module';

const API_NESTJS_STARTER = 'https://jsonplaceholder.typicode.com';

const mockRequestBody = {
  'userId': 1,
  'id': 1,
  'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
};

describe('HttpService', () => {
  let app: INestApplication;
  let service: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
        HttpModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => configService.get('config.httpOptions'),
          inject: [ConfigService],
        }),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init;
    service = module.get<HttpService>(HttpService);
  });

  afterEach(async (done) => {
    await app.close();
    done();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(HttpService);
    expect(service.axiosRef).not.toBeNull();
  });

  it('should be return status 200 - request', async (done) => {
    const { status, data } = await service.request({
      url: `${API_NESTJS_STARTER}/posts`,
      method: 'GET',
    });
    expect(status).toBe(200);
    expect(data.length).toBeGreaterThan(0);
    done();
  });

  it('should be return status 200 - get', async (done) => {
    const { status, data } = await service.get(`${API_NESTJS_STARTER}/posts`);
    expect(status).toBe(200);
    expect(data.length).toBeGreaterThan(0);
    done();
  });

  it('should be return status 201 - post', async (done) => {
    const { status, data } = await service.post(`${API_NESTJS_STARTER}/posts`, mockRequestBody);
    expect(status).toBe(201);
    expect(data).toEqual({
      ...mockRequestBody,
      'id': 101,
    });
    done();
  });

  it('should be return status 200 - get by id', async (done) => {
    const { status, data } = await service.get(`${API_NESTJS_STARTER}/posts/1`);
    expect(status).toBe(200);
    expect(data).toEqual(mockRequestBody);
    done();
  });

  it('should be return status 200 - put', async (done) => {
    const { status, data } = await service.put(`${API_NESTJS_STARTER}/posts/1`, {
      ...mockRequestBody,
      'title': 'mockito',
    });
    expect(status).toBe(200);
    expect(data).toEqual({ ...mockRequestBody, id: 1, 'title': 'mockito' });
    done();
  });

  it('should be return status 200 - delete', async (done) => {
    const { status, data } = await service.delete(`${API_NESTJS_STARTER}/posts/2`);
    expect(status).toBe(200);
    expect(data).toEqual({});
    done();
  });

  it('should be return status 200 - patch', async (done) => {
    const { status, data } = await service.patch(`${API_NESTJS_STARTER}/posts/1`, {
      ...mockRequestBody,
      'title': 'mockito',
    });
    expect(status).toBe(200);
    expect(data).toEqual({ ...mockRequestBody, id: 1, 'title': 'mockito' });
    done();
  });

  it('should be return status 200 - head', async (done) => {
    const { status, headers } = await service.head(`${API_NESTJS_STARTER}/posts`);
    expect(status).toBe(200);
    expect(headers).toHaveProperty('etag');
    done();
  });

});

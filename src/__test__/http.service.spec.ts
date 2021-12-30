import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '../http/services/http.service';
import { AXIOS_INSTANCE_TOKEN } from '../http/constants/http.constants';
import Axios from 'axios';

const API_NESTJS_STARTER = 'https://rudemex-nestjs-starter.herokuapp.com/api';

const mockRequestBody = {
  'firstName': 'Test',
  'lastName': 'Testing',
  'email': 'test@email.com',
};

jest.mock('../http/services/http.service');

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpService,
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useValue: Axios,
        },
      ],
    }).compile();

    service = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be return status 200 - get', async (done) => {
    jest.spyOn(service, 'get').mockImplementationOnce(
      jest.fn().mockResolvedValue({
        status: 200,
        data: [{
          id: 9999,
          ...mockRequestBody,
        }]
      })
    );

    const { status, data } = await service.get(`${API_NESTJS_STARTER}/users`);
    expect(status).toBe(200);
    expect(data).toEqual([{
      id: 9999,
      ...mockRequestBody,
    }])
    done();
  });

  it('should be return status 201 - post', async (done) => {

    jest.spyOn(service, 'post').mockImplementationOnce(
      jest.fn().mockResolvedValue({
        status: 201,
        data: {
          id: 9999,
          ...mockRequestBody,
        }
      })
    );

    const { status, data } = await service.post(`${API_NESTJS_STARTER}/users`, mockRequestBody);
    expect(status).toBe(201);
    expect(data).toEqual({
      id: 9999,
      ...mockRequestBody,
    })
    done();
  });

  it('should be return status 200 - get by id', async (done) => {
    jest.spyOn(service, 'get').mockImplementationOnce(
      jest.fn().mockResolvedValue({
        status: 200,
        data: {
          id: 9999,
          ...mockRequestBody,
        }
      })
    );
    const { status, data } = await service.get(`${API_NESTJS_STARTER}/users/9999`);
    expect(status).toBe(200);
    expect(data).toEqual({
      id: 9999,
      ...mockRequestBody,
    })
    done();
  });

  it('should be return status 200 - put', async (done) => {

    jest.spyOn(service, 'put').mockImplementationOnce(
      jest.fn().mockResolvedValue({
        status: 200,
        data: {
          id: 9999,
          ...mockRequestBody,
          "firstName": "mockito"
        }
      })
    );

    const { status, data } = await service.put(`${API_NESTJS_STARTER}/users/9999`, { ...mockRequestBody, "firstName": "mockito" });
    expect(status).toBe(200);
    expect(data).toEqual({
      id:9999,
      ...mockRequestBody,
      "firstName": "mockito"
    })
    done();
  });

  it('should be return status 200 - delete', async (done) => {
    jest.spyOn(service, 'delete').mockImplementationOnce(
      jest.fn().mockResolvedValue({
        status: 200,
        data: true
      })
    );
    const { status, data } = await service.delete(`${API_NESTJS_STARTER}/users/9999`);
    expect(status).toBe(200);
    expect(data).toEqual(true)
    done();
  });

});

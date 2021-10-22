import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '../http/services/http.service';
import { AXIOS_INSTANCE_TOKEN } from '../http/constants/http.constants';
import Axios from 'axios';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpService,
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useValue: Axios
        }
      ],
    }).compile();

    service = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be return status 200 - get', async (done) =>{
    const { status } = await service.get('https://jsonplaceholder.typicode.com/users')
    expect(status).toBe(200);
    done();
  })

  it('should be return status 201 - post', async (done) =>{
    const { status } = await service.post('https://jsonplaceholder.typicode.com/users')
    expect(status).toBe(201);
    done();
  })

});

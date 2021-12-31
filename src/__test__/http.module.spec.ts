import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpModule } from '../http/http.module';
import { config } from './utils';

class MockedClass {
  createHttpOptions() {
    return {
      timeout: 5000,
      maxRedirects: 5,
    };
  }
}

describe('HttpModule - registerAsync useFactory', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
        HttpModule.registerAsync({
          useFactory: async () => ({
            timeout: 5000,
            maxRedirects: 5,
          }),
        }),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init;
  });

  afterEach(async (done) => {
    await app.close();
    done();
  });

  it('should be define', async (done) => {
    expect(app).toBeDefined();
    done();
  });
});


describe('HttpModule - registerAsync useClass', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
        HttpModule.registerAsync({
          useClass: MockedClass
        }),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init;
  });

  afterEach(async (done) => {
    await app.close();
    done();
  });

  it('should be define', async (done) => {
    expect(app).toBeDefined();
    done();
  });
});

describe('HttpModule - registerAsync useExisting', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
        HttpModule.registerAsync({
          extraProviders: [MockedClass],
          useExisting: MockedClass,
        }),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init;
  });

  afterEach(async (done) => {
    await app.close();
    done();
  });

  it('should be define', async (done) => {
    expect(app).toBeDefined();
    done();
  });
});


describe('HttpModule - register', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
        HttpModule.register({ ...config().httOptions }),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init;
  });

  afterEach(async (done) => {
    await app.close();
    done();
  });

  it('should be define', async (done) => {
    expect(app).toBeDefined();
    done();
  });
});

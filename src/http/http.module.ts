import { DynamicModule, Module, Provider, Global } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import Axios from 'axios';
import axiosRetry from 'axios-retry';
import {
  AXIOS_INSTANCE_TOKEN,
  HTTP_MODULE_ID,
  HTTP_MODULE_OPTIONS,
} from './constants/http.constants';
import { HttpService } from './services/http.service';
import { headers, httpsAgent } from './constants/http.constants';
import {
  HttpModuleAsyncOptions,
  HttpModuleOptions,
  HttpModuleOptionsFactory,
} from './interfaces/http-module.interface';

const createAxiosRetry = (config: HttpModuleOptions) => {
  const axiosInstanceConfig: HttpModuleOptions = {
    headers,
    httpsAgent,
    ...config
  }
  const axiosInstance = Axios.create(axiosInstanceConfig);
  axiosRetry(axiosInstance, axiosInstanceConfig);
  return axiosInstance;
}

@Global()
@Module({
  providers: [
    HttpService,
    {
      provide: AXIOS_INSTANCE_TOKEN,
      useValue: Axios,
    },
  ],
  exports: [HttpService],
})

export class HttpModule {
  static register(config: HttpModuleOptions): DynamicModule {
    return {
      module: HttpModule,
      providers: [
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useValue: createAxiosRetry(config),
        },
        {
          provide: HTTP_MODULE_ID,
          useValue: randomStringGenerator(),
        },
      ],
    };
  }

  static registerAsync(options: HttpModuleAsyncOptions): DynamicModule {
    return {
      module: HttpModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useFactory: (config: HttpModuleOptions) => createAxiosRetry(config),
          inject: [HTTP_MODULE_OPTIONS],
        },
        {
          provide: HTTP_MODULE_ID,
          useValue: randomStringGenerator(),
        },
        ...(options.extraProviders || []),
      ],
    };
  }

  private static createAsyncProviders(
    options: HttpModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const providers = [
      this.createAsyncOptionsProvider(options)
    ];

    if(options.useClass)
      providers.push({
        provide: options.useClass,
        useClass: options.useClass,
      })

    return providers;
  }

  private static createAsyncOptionsProvider(
    options: HttpModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: HTTP_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    let inject;
    if (options.useExisting)
      inject = [options.useExisting];
    else if (options.useClass)
      inject = [options.useClass];

    return {
      provide: HTTP_MODULE_OPTIONS,
      useFactory: async (optionsFactory: HttpModuleOptionsFactory) =>
        optionsFactory.createHttpOptions(),
      inject,
    };
  }
}

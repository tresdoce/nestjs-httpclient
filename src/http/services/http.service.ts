import { Inject, Injectable } from '@nestjs/common';
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AXIOS_INSTANCE_TOKEN } from '../constants/http.constants';

@Injectable()
export class HttpService {
  private ip: string;
  private headers: any;

  constructor(
    @Inject(AXIOS_INSTANCE_TOKEN) private readonly instance: AxiosInstance = Axios,
  ) {

    this.axiosRef.interceptors.request.use( (config: AxiosRequestConfig) => {
      return config;
    });

    this.axiosRef.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        return error;
      },
    );

  }

  get axiosRef(): AxiosInstance {
    return this.instance;
  }

  public initAxios(headers: any, ip: any): void {
    this.ip = ip;
    this.headers = headers;
  }

  // Methods

  request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosRef.request(config);
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosRef.get(url, config);
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosRef.delete(url, config);
  }

  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosRef.head(url, config);
  }

  post<T = any>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosRef.post(url, data, config);
  }

  put<T = any>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosRef.put(url, data, config);
  }

  patch<T = any>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosRef.patch(url, data, config);
  }
}

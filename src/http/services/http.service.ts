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
    this.axiosRef.interceptors.request.use( (config: AxiosRequestConfig) => config);
    this.axiosRef.interceptors.response.use(
      (response) => response, (error) => error);
  }

  get axiosRef(): AxiosInstance {
    return this.instance;
  }

  public initAxios(headers: any, ip: any): void {
    this.ip = ip;
    this.headers = headers;
  }

  // Methods

  public request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosRef.request(config);
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosRef.get(url, config);
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosRef.delete(url, config);
  }

  public head<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosRef.head(url, config);
  }

  public post<T = any>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosRef.post(url, data, config);
  }

  public put<T = any>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosRef.put(url, data, config);
  }

  public patch<T = any>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosRef.patch(url, data, config);
  }
}

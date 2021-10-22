import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Scope } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';

import { HttpService } from '../services/http.service';

@Injectable({ scope: Scope.REQUEST })
export class HttpInterceptor<T> implements NestInterceptor<T, any>{
  private request: Request;
  private response: Response;

  constructor(private readonly httpService: HttpService) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    this.request = ctx.getRequest<Request>();
    this.response = ctx.getResponse<Response>();

    this.httpService.initAxios(this.request.headers, this.request.ip);

    return next.handle();
  }
}

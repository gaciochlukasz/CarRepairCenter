// Third-party
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!environment.production) {
      const developerRequest = req.clone() as any;

      developerRequest.url = location.protocol + '//' + 'localhost:5200/' + req.url;
      developerRequest.urlWithParams = location.protocol + '//' + 'localhost:5200/' + req.urlWithParams;
      return next.handle(developerRequest) as any;
    }
    return next.handle(req) as any;
  }

  constructor() {}
}

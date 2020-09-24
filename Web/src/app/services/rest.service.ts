// Third-party
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// Services
import { BaseRestService } from './base-rest.service';
import { StorageService } from './storage.service';

@Injectable()
export class RestService extends BaseRestService {
  constructor(http: HttpClient, router: Router, storageService: StorageService) {
    super(http, router, storageService);
  }

  public setToken(token: string) {
    super.setToken(token);
  }

  public get(url: string, params?: HttpParams): Observable<any> {
    super.setDirectionHeader('proxy');
    return super.get(url, params);
  }

  public post(url, model: object, params?: HttpParams): Observable<any> {
    super.setDirectionHeader('proxy');
    return super.post(url, model, params);
  }

  public postFormData(url, model: FormData, params?: HttpParams): Observable<any> {
    super.setDirectionHeader('proxy');
    return super.postFormData(url, model, params);
  }

  public put(url, model: object, params?: HttpParams): Observable<any> {
    super.setDirectionHeader('proxy');
    return super.put(url, model, params);
  }

  public delete(url, params?: HttpParams): Observable<any> {
    super.setDirectionHeader('proxy');
    return super.delete(url, params);
  }
}

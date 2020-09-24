// Third-party
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Services
import { StorageService } from './storage.service';
import { BaseRestService } from './base-rest.service';

@Injectable({
  providedIn: 'root'
})
export class GarageRestService extends BaseRestService {

  GarageId = 0;
  private readonly directionHeaderValue = 'garage';
  private readonly garageIdHeaderName = 'Garage-Id';

  constructor(http: HttpClient, router: Router, storageService: StorageService) {
    super(http, router, storageService);
  }

  public setToken(token: string) {
    super.setDirectionHeader(this.directionHeaderValue);
    super.setToken(token);
  }

  public get(url: string, params?: HttpParams): Observable<any> {
    super.setDirectionHeader(this.directionHeaderValue);
    this.setGarageIdHeader();
    return super.get(url, params).pipe(catchError(error => this.handleServiceError(error)));
  }

  public post(url, model: object, params?: HttpParams): Observable<any> {
    super.setDirectionHeader(this.directionHeaderValue);
    this.setGarageIdHeader();
    return super.post(url, model, params).pipe(catchError(error => this.handleServiceError(error)));
  }

  public postFormData(url, model: object, params?: HttpParams): Observable<any> {
    super.setDirectionHeader(this.directionHeaderValue);
    this.setGarageIdHeader();
    return super.postFormData(url, model, params);
  }

  public put(url, model: object, params?: HttpParams): Observable<any> {
    super.setDirectionHeader(this.directionHeaderValue);
    this.setGarageIdHeader();
    return super.put(url, model, params).pipe(catchError(error => this.handleServiceError(error)));
  }

  public delete(url, params?: HttpParams): Observable<any> {
    super.setDirectionHeader(this.directionHeaderValue);
    this.setGarageIdHeader();
    return super.delete(url, params).pipe(catchError(error => this.handleServiceError(error)));
  }

  public setGarageId(id: number) {
    this.GarageId = id;
    this.setGarageIdHeader();
  }

  private setGarageIdHeader() {
    super.setHeader(this.garageIdHeaderName, this.GarageId.toString());
  }

  private handleServiceError(error: HttpErrorResponse): Observable<any> {
    return observableThrowError(error as HttpErrorResponse);
  }

}

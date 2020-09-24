// Third-party
import { Router } from '@angular/router';
import { HttpParams, HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Services
import { StorageService } from './storage.service';

// Models
import { ResponseApiModel } from '../models/response-api.model';
import { RestStatusCode } from '../enums/rest-status-code.enum';

import 'rxjs/add/operator/map';
import 'core-js/es7/reflect';
import { Injectable } from '@angular/core';

export class CustomHttpHeaders {
  name: string;
  value: string;
}
@Injectable()
export class BaseRestService {
  private headersArray: CustomHttpHeaders[] = [];

  constructor(private http: HttpClient, private router: Router, public storageService: StorageService) {
    const currentUser = this.storageService.local.getLoggedUser();

    if (currentUser) {
      this.setToken(currentUser.authorizationToken.authToken);
    }

    this.setSessionGuid();
  }

  protected setSessionGuid() {
    let sessionGuid = this.storageService.session.getSessionGuid();

    if (!sessionGuid) {
      // fix for  Circular dependency detected: (HelperService)
      const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      };
      sessionGuid = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      this.storageService.session.setSessionGuid(sessionGuid);
    }

    this.setHeader('SessionGuid', sessionGuid);
  }

  protected setDirectionHeader(direction: string) {
    this.setHeader('Direction-Type', direction);
  }

  protected setToken(token: string) {
    this.deleteHeader('Authorization');
    if (token == null) {
      return;
    }
    this.setHeader('Authorization', `Bearer ${token}`);
  }

  protected setHeader(name: string, value: string) {
    if (!name || !value) {
      return;
    }
    for (let index = 0; index < this.headersArray.length; index++) {
      if (this.headersArray[index].name === name) {
        this.headersArray[index].value = value;
        return;
      }
    }
    const header = new CustomHttpHeaders();
    header.name = name;
    header.value = value;
    this.headersArray.push(header);
  }

  protected deleteHeader(name: string) {
    for (let index = 0; index < this.headersArray.length; index++) {
      if (this.headersArray[index].name === name) {
        this.headersArray[index].value = null;
        break;
      }
    }
  }

  protected get(url: string, params?: HttpParams): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(url, { headers, params }).pipe(
      map((response: ResponseApiModel<any>) => this.handleApiResponse(response)),
      catchError(error => this.handleError(error))
    );
  }

  protected post(url, model: object, params?: HttpParams): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(url, model, { headers, params }).pipe(
      map((response: ResponseApiModel<any>) => this.handleApiResponse(response),
      catchError(error => this.handleError(error)))
      );
    }

    protected postFormData(url, model: object, params?: HttpParams): Observable<any> {
    const headers = this.getHeadersFormData();
    return this.http.post(url, model, { headers, params: params }).pipe(
      map((response: ResponseApiModel<any>) => this.handleApiResponse(response)),
      catchError(error => this.handleError(error))
    );
  }

  protected put(url, model: object, params?: HttpParams): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(url, model, { headers, params }).pipe(
      map((response: ResponseApiModel<any>) => this.handleApiResponse(response)),
      catchError(error => this.handleError(error))
    );
  }

  protected delete(url, params?: HttpParams): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(url, { headers, params }).pipe(
      map((response: ResponseApiModel<any>) => this.handleApiResponse(response)),
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    const responseApi = error.error as ResponseApiModel<any>;

    if (error.status === RestStatusCode.NotModified) {
    } else if (error.status === RestStatusCode.NotFound) {

      console.error('Cannot found ', error.url);
    } else if (error.status === RestStatusCode.Unauthorized) {

      this.storageService.clear();
      document.location.href = '/'; // To refresh all variables in JS. Old -  this.router.navigate(['/login']);
      return null;
    } else if (error.status === RestStatusCode.Forbidden) {

      return observableThrowError(error as HttpErrorResponse);
    }
    return observableThrowError(responseApi);
  }

  private handleApiResponse(responseApiModel: ResponseApiModel<any>): any {
    if (responseApiModel.responseStatusCode === RestStatusCode.OK) {
      return responseApiModel.responseResult;
    } else {
      return this.handleApiResponseError(responseApiModel);
    }
  }

  private handleApiResponseError(responseApiModel: ResponseApiModel<any>): Observable<any> {
    if (responseApiModel.responseStatusCode === RestStatusCode.NoContent) {
      return null;
    }
    if (responseApiModel.responseStatusCode === RestStatusCode.Unauthorized) {
      this.router.navigate(['/login']);
      this.storageService.clear();
      return null;
    }
    throw observableThrowError(responseApiModel);
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');

    this.headersArray.forEach(header => {
      if (header.value) {
        headers = headers.append(header.name, header.value.toString());
      }
    });

    return headers;
  }

  private getHeadersFormData(): HttpHeaders {
    let headers = new HttpHeaders();

    this.headersArray.forEach(header => {
      if (header.value) {
        headers = headers.append(header.name, header.value.toString());
      }
    });

    return headers;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { AppConfig } from '../../app.config';

import * as _ from 'underscore';

@Injectable()
export class HttpService {
  public REST_SERVER_IP = this.globalConfig.getConfig('host');
  private PURE_SERVER_ROOT = '';
  public V1_URLS = {
    AUTHSRVICE: 'authdata'
  }

  constructor(
    private config: ConfigService,
    private http: HttpClient,
    private globalConfig: AppConfig
  ) {
    this.PURE_SERVER_ROOT = `${location.protocol}//${this.REST_SERVER_IP}srvz/`;

    for (let key in this.V1_URLS) {
      this.V1_URLS[key] = this.PURE_SERVER_ROOT + this.V1_URLS[key];
    }
  }

  getAuthdata() {
    return this.http.get(this.V1_URLS.AUTHSRVICE)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    // We found unauthenticate problem... just reload the page...
    if (error && (error.status === 403 || error.status === 401 || error.status === 0)) {
      this.config.logoutApp();
    }

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}

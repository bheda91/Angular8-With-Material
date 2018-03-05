import { Injectable } from '@angular/core';
import { Http, Request, Response, URLSearchParams, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';
import { AppConfig } from './../../app.config';

import * as _ from 'underscore';

@Injectable()
export class HttpService {
  public REST_SERVER_IP = this.globalConfig.getConfig('host');
  private PURE_SERVER_ROOT = '';
  public V1_SRV_URLS = {
    AUTHSRVICE: 'authdata'
  }

  constructor(
    private config: ConfigService,
    private http: Http,
    private globalConfig: AppConfig
  ) {
    this.PURE_SERVER_ROOT = `${location.protocol}//${this.REST_SERVER_IP}srvz/`;

    for (let key in this.V1_SRV_URLS) {
      this.V1_SRV_URLS[key] = this.PURE_SERVER_ROOT + this.V1_SRV_URLS[key];
    }
  }

  getAuthdata() {
    return this.initRequest({
      url: this.V1_SRV_URLS.AUTHSRVICE
    });
  }

  initRequest(options) {
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    var requestoptions = new RequestOptions({
      method: options["method"] | RequestMethod.Get,
      url: options["url"],
      headers: headers,
      body: JSON.stringify(options["params"]),
      withCredentials: true
    });
    this.config.showLoader();
    return this.http.request(new Request(requestoptions))
      .map((res: Response) => {
        this.config.hideLoader();
        if (options.isText) {
          return res.text();
        } else {
          let response = res.json();
          if (!_.isEmpty(options["appendJson"])) {
            _.extend(response, options["appendJson"]);
          }
          return response;
        }
      })
      .catch(error => {
        this.config.hideLoader();
        // We found unauthenticate problem... just reload the page...
        if (error && (error.status === 403 || error.status === 401 || error.status === 0)) {
          this.config.logoutApp();
        }
        return Observable.throw(error);
      })
      .first();
  }
}

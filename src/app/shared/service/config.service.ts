import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConfig } from './../../app.config';

@Injectable()
export class ConfigService {
  private isGetAuthData = false;
  private authData = null;
  private currentMenu = null;
  private companyInfo = {};


  private currentScreenName: string = '';
  private screenName = new Subject<any>();
  screenName$ = this.screenName.asObservable();

  private logoutAppSub = new Subject<any>();
  logoutApp$ = this.logoutAppSub.asObservable();

  private showLoading: number = 0;
  private loader = new Subject<boolean>();
  loader$ = this.loader.asObservable();
  private loaderTimer: any = null;

  private SESSION_KEY_NAME = 'club_auth_token_' + this.config.getConfig('guitype');

  constructor(private config: AppConfig) {

  }

  public setAuthenticateData(authData) {
    this.authData = authData;
    this.isGetAuthData = true;
  }

  public getAuthenticateData() {
    return this.isGetAuthData;
  }

  public setCurrentMenu(currentMenu) {
    this.currentMenu = currentMenu;

    // Set Screen Name
    if (this.currentMenu) {
      this.setScreenName(this.currentMenu.labelKey);
    }
  }

  public setScreenName(screenName) {
    this.currentScreenName = screenName;
    this.screenName.next(screenName);
  }

  public getCurrentMenu() {
    return this.currentMenu;
  }

  public getSessionKeyName() {
    return this.SESSION_KEY_NAME;
  }

  public logoutApp() {
    this.logoutAppSub.next(true);
  }

  public showLoader() {
    this.clearLoaderTime();
    this.showLoading += 1;
    this.loader.next(true);
  }

  public clearLoaderTime() {
    clearTimeout(this.loaderTimer);
    this.loaderTimer = null;
  }

  public hideLoader(count?) {
    if (this.showLoading > 0) {
      this.showLoading -= (count || 1);
    }
    this.loaderTimer = setTimeout(() => {
      if (!this.showLoading) {
        this.loader.next(false);
      }
    }, 250);
  }

  public unsubscribeAndClear(sub, count?) {
    if (sub) {
      sub.unsubscribe();
      this.hideLoader(count);
    }
    sub = null;
  }

  public setCompanyInfo(companyInfo) {
    this.companyInfo = companyInfo;
  }

  public getCompanyInfo() {
    return this.companyInfo;
  }
}

import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { fadeInOutAnimation } from './shared/util/animation';

import { AppConfig } from './shared/service/app-config.service';
import { ConfigService } from './shared/service/config.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [fadeInOutAnimation]
})
export class AppComponent implements OnInit, OnDestroy {
  private config = inject(ConfigService);
  private titleService = inject(Title);
  private globalConfig = inject(AppConfig);

  companyInfo = {
    name: '',
    system: ''
  };
  guiType = 'Admin';
  logoutSub: Subscription | null = null;
  sessionKey: string | null = null;
  showLoader = false;

  constructor() {
    // Get company name from config
    this.companyInfo.name = this.globalConfig.getConfig('company-name') || 'Angular';
    this.companyInfo.system = this.globalConfig.getConfig('system') || '21';
    this.guiType = this.globalConfig.getConfig('guitype');
    this.sessionKey = this.config.getSessionKeyName();

    const titleSuffix = this.globalConfig.getConfig('title') || 'Angular21';
    this.setTitle(`${titleSuffix}`);
    this.config.setCompanyInfo(this.companyInfo);

    this.logoutSub = this.config.logoutApp$.subscribe(
      () => {
        setTimeout(() => {
          location.reload();
        }, 2000);
      });
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  getPageName() {
    const href = location.pathname;
    return href.substring(href.lastIndexOf('/') + 1);
  }

  ngOnInit() {
    const localStorageKey = this.guiType === 'Admin' ? 'carem' : 'ccrem';
    const rem = localStorage.getItem(localStorageKey);
    if (localStorage.getItem(this.config.getSessionKeyName())) {
      this.config.setAuthenticateData({ authenticate: true });
    }
    else if (!rem) {
      // If user not check "Remember Me" then only redirect user to login screen...
      this.config.setAuthenticateData(null);
    }
  }

  ngOnDestroy() {
    this.logoutSub?.unsubscribe();
    this.logoutSub = null;
  }
}

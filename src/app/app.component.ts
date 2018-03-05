import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { fadeInOutAnimation } from './shared/util/animation';

import { AppConfig } from './app.config';
import { ConfigService } from './shared/service/config.service';
import { HttpService } from './shared/service/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInOutAnimation]
})
export class AppComponent {
  companyInfo = {
    name: '',
    system: ''
  };
  guiType: string = 'Admin';
  logoutSub: any = null;
  sessionKey: any = null;
  showLoader: boolean = false;

  constructor(
    private config: ConfigService,
    private http: HttpService,
    private titleService: Title,
    private globalConfig: AppConfig
  ) {
    // Get company name from config
    this.companyInfo.name = this.globalConfig.getConfig('company-name') || 'MIL';
    this.companyInfo.system = this.globalConfig.getConfig('system') || 'Club';
    this.guiType = this.globalConfig.getConfig('guitype');
    this.sessionKey = this.config.getSessionKeyName();

    let titleSuffix = this.globalConfig.getConfig('title') || 'MIL Club';
    this.setTitle(`${titleSuffix}`);
    this.config.setCompanyInfo(this.companyInfo);

    this.logoutSub = this.config.logoutApp$.subscribe(
      isLogout => {
        setTimeout(() => {
          location.reload();
        }, 2000);
      });
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  getPageName() {
    let href = location.pathname;
    return href.substr(href.lastIndexOf('/') + 1);
  }

  ngOnInit() {
    let localStorageKey = this.guiType === 'Admin' ? 'carem' : 'ccrem';
    let rem = localStorage.getItem(localStorageKey);
    if (localStorage.getItem(this.config.getSessionKeyName())) {
      this.config.setAuthenticateData({ authenticate: true });
    }
    else if (!rem) {
      // If user not check "Remember Me" then only redirect user to login screen...
      this.config.setAuthenticateData(null);
    }
  }

  ngOnDestroy() {
    this.logoutSub.unsubscribe();
    this.logoutSub = null;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

// import fade in-out animation
import { fadeInOutAnimation } from './../../shared/util/animation';
import { ConfigService } from './../../shared/service/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInOutAnimation]
})
export class HomeComponent implements OnInit {
  iPhoneStyle: any = {};
  routerEventSub: any = null;
  currentURLMenuName: string = '';
  menus: any = [
    {
      name: 'Your Time',
      hrefProp: 'your-time'
    },
    {
      name: 'Planner',
      hrefProp: 'planner'
    },
    {
      name: 'Leave',
      hrefProp: 'leave'
    },
    {
      name: 'Snacks!',
      hrefProp: 'snacks'
    }
  ];

  constructor(
    private router: Router,
    private config: ConfigService
  ) {
    this.routerEventSub = router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.setCurrentMenuFromURL(event);
      }
    });

    let deviceAgent = navigator.userAgent.toLowerCase();
    let agentID = deviceAgent.match(/(iPad|iPhone|iPod)/i);
    if (agentID) {
      this.iPhoneStyle = {
        'overflow-y': 'scroll',
        '-webkit-overflow-scrolling': 'touch'
      };
    }
  }

  ngOnInit() {
  }

  setCurrentMenuFromURL(event) {
    let href = event['url'];
    let currentMenuTableName = href.substr(href.lastIndexOf('/') + 1);
    // If in future, any screen name contains HOME as a router url, please remove this...
    if (currentMenuTableName) {
      localStorage.setItem('currentTableName', currentMenuTableName);
      this.currentURLMenuName = currentMenuTableName;
    }
  }

  logoutClick() {
    let sessionKey = this.config.getSessionKeyName();
    /*this.logoutSub = this.http.logout().subscribe(
      data => {
        localStorage.removeItem(sessionKey);
        this.logoutSub = null;
        this.router.navigate(['/']);
      },
      error => {
        localStorage.removeItem(sessionKey);
        this.logoutSub = null;
        this.router.navigate(['/']);
      }
    );*/
    localStorage.removeItem(sessionKey);
    this.router.navigate(['/']);
  }

}

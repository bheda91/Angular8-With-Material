import { NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';

// import fade in-out animation
import { fadeInOutAnimation } from './../../shared/util/animation';
import { ConfigService } from './../../shared/service/config.service';

@Component({
  selector: 'app-home',
  imports: [NgStyle, RouterLink, RouterOutlet, MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [fadeInOutAnimation]
})
export class HomeComponent {
  private router = inject(Router);
  private config = inject(ConfigService);

  iPhoneStyle: Record<string, string> = {};
  currentURLMenuName = '';
  menus = [
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

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.setCurrentMenuFromURL(event);
      }
    });

    const deviceAgent = navigator.userAgent.toLowerCase();
    const agentID = deviceAgent.match(/(iPad|iPhone|iPod)/i);
    if (agentID) {
      this.iPhoneStyle = {
        'overflow-y': 'scroll',
        '-webkit-overflow-scrolling': 'touch'
      };
    }
  }

  setCurrentMenuFromURL(event: NavigationStart) {
    const href = event.url;
    const currentMenuTableName = href.substring(href.lastIndexOf('/') + 1);
    // If in future, any screen name contains HOME as a router url, please remove this...
    if (currentMenuTableName) {
      localStorage.setItem('currentTableName', currentMenuTableName);
      this.currentURLMenuName = currentMenuTableName;
    }
  }

  logoutClick() {
    const sessionKey = this.config.getSessionKeyName();
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

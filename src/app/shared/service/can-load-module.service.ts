import { ActivatedRouteSnapshot, CanLoad, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';

@Injectable()
export class CanLoadModuleService implements CanLoad {
  constructor(private config: ConfigService) { }

  canLoad(route: Route): Promise<boolean> {
    let self = this;
    return new Promise((resolve, reject) => {
      function myClosure() {
        if (self.config.getAuthenticateData()) {
          setTimeout(() => {
            // As per current menu, return true or false
            // As we had set current menu only when user allowed to navigate
            resolve(self.config.getCurrentMenu() ? true : false);
          }, 100);
        }
        else {
          setTimeout(() => {
            myClosure();
          }, 100);
        }
      }
      myClosure();
    });
  }
}

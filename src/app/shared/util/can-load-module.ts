import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { ConfigService } from '../service/config.service';

export const canLoadModule: CanMatchFn = () => {
  const config = inject(ConfigService);

  return new Promise<boolean>(resolve => {
    function myClosure() {
      if (config.getAuthenticateData()) {
        setTimeout(() => {
          // As per current menu, return true or false
          // As we had set current menu only when user allowed to navigate
          resolve(config.getCurrentMenu() ? true : false);
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
};

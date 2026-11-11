import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import * as _ from 'underscore';
import { ConfigService } from '../service/config.service';

export const canActivateUser: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const config = inject(ConfigService);

    // For standAlone user, always return true
    if (_.has(route.queryParams, 'standAlone')) {
        return true;
    }

    if (localStorage.getItem(config.getSessionKeyName())) {
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};

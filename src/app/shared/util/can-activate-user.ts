import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ConfigService } from './../service/config.service';
import * as Rx from 'rxjs';
import * as _ from 'underscore';

@Injectable()
export class CanActivateUser implements CanActivate {
    constructor(private router: Router, private config: ConfigService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // For standAlone user, always return true
        if (_.has(route.queryParams, 'standAlone')) {
            return true;
        }

        if (localStorage.getItem(this.config.getSessionKeyName())) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}

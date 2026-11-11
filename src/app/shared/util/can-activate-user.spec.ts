import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';

import { ConfigService } from '../service/config.service';
import { canActivateUser } from './can-activate-user';

describe('canActivateUser', () => {
  const runGuard = (url: string, queryParams = {}) => TestBed.runInInjectionContext(() =>
    canActivateUser({ queryParams } as ActivatedRouteSnapshot, { url } as RouterStateSnapshot));

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()]
    });
  });

  it('should redirect to login with the return url when nobody is logged in', () => {
    const result = runGuard('/home/planner');

    expect(result).toBeInstanceOf(UrlTree);
    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe('/login?returnUrl=%2Fhome%2Fplanner');
  });

  it('should allow a logged in user', () => {
    localStorage.setItem(TestBed.inject(ConfigService).getSessionKeyName(), 'token');

    expect(runGuard('/home')).toBe(true);
  });

  it('should allow a standAlone user', () => {
    expect(runGuard('/home', { standAlone: '' })).toBe(true);
  });
});

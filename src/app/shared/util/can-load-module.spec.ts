import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Route } from '@angular/router';

import { ConfigService } from '../service/config.service';
import { canLoadModule } from './can-load-module';

describe('canLoadModule', () => {
  const runGuard = () => TestBed.runInInjectionContext(() => canLoadModule({} as Route, [])) as Promise<boolean>;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
  });

  afterEach(() => vi.useRealTimers());

  it('should wait for auth data, then allow the route when a current menu is set', async () => {
    const config = TestBed.inject(ConfigService);
    const result = runGuard();

    config.setCurrentMenu({ labelKey: 'planner' });
    config.setAuthenticateData({ authenticate: true });
    await vi.advanceTimersByTimeAsync(200);

    await expect(result).resolves.toBe(true);
  });

  it('should block the route when no current menu is set', async () => {
    TestBed.inject(ConfigService).setAuthenticateData({ authenticate: true });
    const result = runGuard();

    await vi.advanceTimersByTimeAsync(100);

    await expect(result).resolves.toBe(false);
  });
});

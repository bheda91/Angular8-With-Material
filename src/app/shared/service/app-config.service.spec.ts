import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AppConfig } from './app-config.service';

describe('AppConfig', () => {
  let appConfig: AppConfig;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    appConfig = TestBed.inject(AppConfig);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('should load values from config.json', async () => {
    const loaded = appConfig.load();
    httpTesting.expectOne('config.json?v1').flush({ guitype: 'Employee', title: 'MIL Club Employee' });

    await expect(loaded).resolves.toBe(true);
    expect(appConfig.getConfig('title')).toBe('MIL Club Employee');
  });

  it('should still resolve when config.json cannot be read', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const loaded = appConfig.load();
    httpTesting.expectOne('config.json?v1').flush('Not found', { status: 404, statusText: 'Not Found' });

    await expect(loaded).resolves.toBe(true);
    expect(appConfig.getConfig('title')).toBeUndefined();
    expect(log).toHaveBeenCalledWith('Configuration file could not be read');
  });
});

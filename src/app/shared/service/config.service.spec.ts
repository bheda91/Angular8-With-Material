import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AppConfig } from './app-config.service';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
  });

  it('should be created', () => {
    expect(TestBed.inject(ConfigService)).toBeTruthy();
  });

  it('should build the session key from the gui type in config.json', async () => {
    const loaded = TestBed.inject(AppConfig).load();
    TestBed.inject(HttpTestingController).expectOne('config.json?v1').flush({ guitype: 'Employee' });
    await loaded;

    expect(TestBed.inject(ConfigService).getSessionKeyName()).toBe('club_auth_token_Employee');
  });

  it('should report authentication once auth data is set', () => {
    const service = TestBed.inject(ConfigService);
    expect(service.getAuthenticateData()).toBe(false);

    service.setAuthenticateData({ authenticate: true });

    expect(service.getAuthenticateData()).toBe(true);
  });
});

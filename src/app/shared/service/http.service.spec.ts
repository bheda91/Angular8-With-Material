import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AppConfig } from './app-config.service';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('should request auth data from the host in config.json', async () => {
    const loaded = TestBed.inject(AppConfig).load();
    httpTesting.expectOne('config.json?v1').flush({ host: 'example.test/api/' });
    await loaded;

    let result: unknown;
    TestBed.inject(HttpService).getAuthdata().subscribe(data => result = data);
    httpTesting.expectOne(`${location.protocol}//example.test/api/srvz/authdata`).flush({ ok: true });

    expect(result).toEqual({ ok: true });
  });

  it('should ask the app to log out when the server answers 401', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const logout = vi.spyOn(TestBed.inject(ConfigService), 'logoutApp');

    let error: unknown;
    TestBed.inject(HttpService).getAuthdata().subscribe({ error: e => error = e });
    // The first request plus three retries
    for (let attempt = 0; attempt < 4; attempt++) {
      httpTesting.expectOne(req => req.url.endsWith('srvz/authdata'))
        .flush('', { status: 401, statusText: 'Unauthorized' });
    }

    expect(logout).toHaveBeenCalled();
    expect(error).toBe('Something bad happened; please try again later.');
  });
});

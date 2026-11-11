import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Router, provideRouter } from '@angular/router';

import { ConfigService } from '../../shared/service/config.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting(), provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a toolbar link for every menu', () => {
    const links: HTMLAnchorElement[] = Array.from(fixture.nativeElement.querySelectorAll('a[mat-button]'));
    expect(links.map(link => link.textContent?.trim())).toEqual(['Your Time', 'Planner', 'Leave', 'Snacks!']);
    expect(links[0].getAttribute('href')).toBe('/home/your-time');
  });

  it('should clear the session and go to the start page on logout', () => {
    const sessionKey = TestBed.inject(ConfigService).getSessionKeyName();
    localStorage.setItem(sessionKey, 'token');
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);

    component.logoutClick();

    expect(localStorage.getItem(sessionKey)).toBeNull();
    expect(navigate).toHaveBeenCalledWith(['/']);
  });
});

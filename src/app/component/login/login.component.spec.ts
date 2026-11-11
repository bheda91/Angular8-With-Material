import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and show the login form', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('form')).toBeTruthy();
  });

  it('should not check credentials while username or password is empty', () => {
    const validate = vi.spyOn(component, 'validateCredential');
    component.onSubmit();
    expect(component.loginForm.valid).toBe(false);
    expect(validate).not.toHaveBeenCalled();
  });

  describe('after the simulated server delay', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('should store a session and go home for valid credentials', () => {
      const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
      component.loginForm.setValue({ username: 'bheda91', password: 'password' });

      component.onSubmit();
      vi.advanceTimersByTime(2000);

      expect(navigate).toHaveBeenCalledWith(['/home']);
      expect(localStorage.getItem(component.sessionKey)).toHaveLength(32);
    });

    it('should show an error for wrong credentials', () => {
      component.loginForm.setValue({ username: 'bheda91', password: 'wrong' });

      component.onSubmit();
      vi.advanceTimersByTime(2000);
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain('Credential not match');
      expect(component.isDisabled).toBe(false);
    });
  });
});

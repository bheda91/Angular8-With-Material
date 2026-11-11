import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigService } from './../../shared/service/config.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private config = inject(ConfigService);
  private router = inject(Router);
  private activatedRouter = inject(ActivatedRoute);

  loginError = '';
  loginSuccess = '';
  isDisabled = false;
  sessionKey: string = this.config.getSessionKeyName();
  returnUrl = '';
  showLoader = true;
  loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });
  userNameMatcher = new MyErrorStateMatcher();
  passwordMatcher = new MyErrorStateMatcher();

  ngOnInit() {
    // get return url from route parameters or default to '/'
    if (localStorage.getItem(this.sessionKey)) {
      // already logged in, so check for Auth Data and return to home
      this.returnUrl = '/home';
      this.router.navigate([this.returnUrl]);
    }
    else {
      this.returnUrl = this.activatedRouter.snapshot.queryParams['returnUrl'] || '/home';
      this.showLoader = false;
    }
  }

  onSubmit() {
    const { username, password } = this.loginForm.getRawValue();
    if (username && password) {
      this.validateCredential(username, password);
    }
  }

  validateCredential(username: string, password: string) {
    this.isDisabled = true;
    this.loginError = '';
    this.loginSuccess = '';
    setTimeout(() => {
      if (username === 'bheda91' && password === 'password') {
        this.loginSuccess = 'Login successful';
        localStorage.setItem(this.sessionKey, this.makeid(32));
        this.config.setAuthenticateData({ authenticate: true });
        // Route to Home screen...
        this.router.navigate([this.returnUrl]);
      }
      else {
        // Bad credentials
        this.loginError = 'Credential not match';
      }
      this.isDisabled = false;
    }, 2000);
  }

  makeid(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}

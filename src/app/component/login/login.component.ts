import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

import { ConfigService } from './../../shared/service/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loginError: string = '';
  loginSuccess: string = '';
  isDisabled: boolean = false;
  sessionKey: string = this.config.getSessionKeyName();
  returnUrl = '';
  showLoader: boolean = true;
  userNameFormControl: any = null;
  passwordFormControl: any = null;
  userNameMatcher: any = null;
  passwordMatcher: any = null;

  constructor(
    private config: ConfigService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {

    this.userNameFormControl = new FormControl('', [
      Validators.required
    ]);

    this.passwordFormControl = new FormControl('', [
      Validators.required
    ]);

    this.userNameMatcher = new MyErrorStateMatcher();
    this.passwordMatcher = new MyErrorStateMatcher();
  }

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
    if (this.username && this.password) {
      this.validateCredential();
    }
  }

  validateCredential() {
    this.isDisabled = true;
    this.loginError = '';
    this.loginSuccess = '';
    setTimeout(() => {
      if (this.username === 'bheda91' && this.password === 'password') {
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

  makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}

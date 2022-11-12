import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [``],
})
export class LoginComponent implements OnInit, OnDestroy {
  LoginFormGroup: FormGroup;
  endSubs$: Subject<any> = new Subject();
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }
  ngOnDestroy(): void {
    this.endSubs$.next(null);
    this.endSubs$.complete();
  }

  private _initLoginForm() {
    this.LoginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.loginForm.invalid) return;

    this.auth
      .login(this.loginForm.email.value, this.loginForm.password.value)
      .pipe(takeUntil(this.endSubs$))
      .subscribe(
        (user) => {
          this.authError = false;
          this.localstorageService.setToken(user.token);
          this.router.navigate(['/']);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.authError = true;
          if (error.status !== 400) {
            this.authMessage = 'Error in the Server, please try again later';
          }
        }
      );
  }

  get loginForm() {
    return this.LoginFormGroup.controls;
  }
}

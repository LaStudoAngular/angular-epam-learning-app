import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../@services/auth.service';
import { CourseService } from '../../../@services/course.service';
import { delay, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ep-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public indicator = true;
  private destroy = new Subject();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private courseService: CourseService,
  ) {}

  ngOnInit(): void {

    // INITIALIZE FORM
    this.loginForm = this.fb.group({
      login: [null, [Validators.required, Validators.minLength(2)]],
      password: [null, [Validators.required, Validators.minLength(2)]],
    });

    // SET INDICATOR
    setTimeout(() => this.indicator = false, 1000);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { login, password } = this.loginForm.value;
      this.authService.login(login, password);
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}

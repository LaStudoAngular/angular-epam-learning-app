import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ep-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: [null, [Validators.required, Validators.minLength(2)]],
      password: [null, [Validators.required, Validators.minLength(2)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { login, password } = this.loginForm.value;
      this.authService.login(login, password);
    }
  }
}

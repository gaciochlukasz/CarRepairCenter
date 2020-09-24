import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/models/login.mode';
import { AuthService } from 'src/app/services/auth.service';
import { BlockUIService } from 'src/app/services/block-ui.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EmailValidation } from 'src/app/validators/email.validation';

@Component({
  selector: 'crc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: boolean;
  wrongLoginOrPassword = false;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private blockUIService: BlockUIService,
    private route: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', { validators: [Validators.required, EmailValidation.EmailValid] }],
      password: ['', { validators: [Validators.required] }]
    });
  }

  go() {
    if (!this.form.valid) {
      return;
    }
    const login = this.form.value as LoginModel;
    this.blockUIService.mainLockAll(true);
    this.authService.signIn(login).subscribe((x: any) => {
      this.authService.login(x);
    }, () => {
      this.wrongLoginOrPassword = true;
      this.blockUIService.mainLockAll(false);
    });
  }

  register() {
    this.route.navigate(['/register']);
  }
}

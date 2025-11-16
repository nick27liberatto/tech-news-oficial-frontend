import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ValidationErrorMessageComponent } from '../../components/validation-error-message/validation-error-message.component';
@Component({
  selector: 'app-login-form-page',
  imports: [ReactiveFormsModule, RouterLink, ValidationErrorMessageComponent],
  templateUrl: './login-form-page.html',
  styleUrl: './login-form-page.scss'
})
export class LoginFormPage {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', Validators.required)
  });

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Formulário enviado com sucesso:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onGoogleLogin() {
    console.log('Login com Google não implementado.');
  }

  onGithubLogin() {
    console.log('Login com GitHub não implementado.');
  }

  onResetForm() {
    this.form.reset();
  }
}

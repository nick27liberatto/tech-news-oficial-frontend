import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ValidationErrorMessageComponent } from '../../components/validation-error-message/validation-error-message.component';

@Component({
  selector: 'app-forgot-password-form-page',
  imports: [RouterLink, ReactiveFormsModule, ValidationErrorMessageComponent],
  templateUrl: './forgot-password-form-page.html',
  styleUrl: './forgot-password-form-page.scss'
})
export class ForgotPasswordFormPage {
    form:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  sendCode(){
    console.log("code");
  }

  resetForm(){
    this.form.reset();
  }

  get email() {
    return this.form.get('email') as FormControl;
  }
}

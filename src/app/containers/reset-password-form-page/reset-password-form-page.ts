import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ValidationErrorMessageComponent } from '../../components/validation-error-message/validation-error-message.component';
import { PasswordService } from '../../services/password.service';

@Component({
  selector: 'app-reset-password-form-page',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, ValidationErrorMessageComponent],
  templateUrl: './reset-password-form-page.html',
  styleUrl: './reset-password-form-page.scss'
})
export class ResetPasswordFormPage {
  private passwordService = inject(PasswordService);
  form: FormGroup = new FormGroup({
    senha: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      this.passwordService.passwordStrengthValidator()
    ]),
    confirmarSenha: new FormControl('', [
      Validators.required
    ]),
  }, {
    validators: [PasswordService.passwordMismatch('senha', 'confirmarSenha')]
  });

  onSubmit() {
    if (this.form.valid) {
      console.log('Formulário enviado:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onResetForm() {
    this.form.reset();
  }

  get senha() {
    return this.form.get('senha') as FormControl;
  }
  get confirmarSenha() {
    return this.form.get('confirmarSenha') as FormControl;
  }
}

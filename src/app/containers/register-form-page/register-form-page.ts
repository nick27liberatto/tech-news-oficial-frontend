import { Component, inject, Inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, Form } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService as SupabaseService } from '../../services/supabase.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { ValidationErrorMessageComponent } from '../../components/validation-error-message/validation-error-message.component';
import { PasswordService } from '../../services/password.service';

@Component({
  selector: 'app-register-form-page',
  imports: [ReactiveFormsModule, RouterLink, ValidationErrorMessageComponent],
  templateUrl: './register-form-page.html',
  styleUrl: './register-form-page.scss'
})
export class RegisterFormPage {
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private passwordService = inject(PasswordService);

  form: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      this.passwordService.passwordStrengthValidator()
    ]),
    confirmPassword: new FormControl('', [Validators.required])
  }, {
    validators: [PasswordService.passwordMismatch('password', 'confirmPassword')]
  });

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const response = await this.supabaseService.signUp(this.fullName.value, this.email.value, this.password.value);

    if (response.error) {
      console.log('Erro ao realizar cadastro.', response.error)
      this.snackBar.open(response.error.message, undefined), {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: 'custom-error-snackbar'
      };
      return;
    }
    
    console.log('Sucesso ao realizar cadastro!', response.data)
    this.snackBar.open('Cadastro realizado com sucesso!', undefined, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'custom-success-snackbar'
    });

    this.router.navigate(['/confirm-email']);
  }

  onGoogleLogin() {
    this.supabaseService.signInWithSocialAccount('google');
  }

  onGithubLogin() {
    this.supabaseService.signInWithSocialAccount('github');
  }

  resetForm() {
    this.form.reset();
  }

  get fullName() {
    return this.form.get('fullName') as FormControl;
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.form.get('confirmPassword') as FormControl;
  }
}

import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ValidationErrorMessageComponent } from '../../components/validation-error-message/validation-error-message.component';
import { SupabaseService } from '../../services/supabase.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { PasswordService } from '../../services/password.service';
@Component({
  selector: 'app-login-form-page',
  imports: [ReactiveFormsModule, RouterLink, ValidationErrorMessageComponent],
  templateUrl: './login-form-page.html',
  styleUrl: './login-form-page.scss'
})
export class LoginFormPage {
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private passwordService = inject(PasswordService);

  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      this.passwordService.passwordStrengthValidator()
    ])
  });

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const response = await this.supabaseService.signIn(this.email.value, this.password.value);

    if (response.error) {
      console.log('Erro ao realizar login.', response.error)
      this.snackBar.open(response.error.message, undefined), {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: 'custom-error-snackbar'
      };
      return;
    }

    console.log('Sucesso ao realizar login!', response.data)
    this.router.navigate(['/home']);
    return;
  }

  onGoogleLogin() {
    this.supabaseService.signInWithSocialAccount('google');
  }

  onGithubLogin() {
    this.supabaseService.signInWithSocialAccount('github');
  }

  onResetForm() {
    this.form.reset();
  }
}

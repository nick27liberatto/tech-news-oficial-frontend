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

  onSubmit() {
    if (this.form.valid) {
      this.supabaseService.signUp(this.form.value.fullName, this.form.value.email, this.form.value.password)
        .then((response) => {
          if (response.error) {
            console.log('Erro ao realizar cadastro.', response.error)
            this.snackBar.open(response.error.message, undefined, {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: 'custom-error-snackbar'
            });
          } else {
            console.log('Sucesso ao realizar cadastro!', response.data)
            this.router.navigate(['/login']);
          }
        })
        .catch((error) => {
          console.error('Erro ao fazer login:', error);
        });
    } else {
      this.form.markAllAsTouched();
    }
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

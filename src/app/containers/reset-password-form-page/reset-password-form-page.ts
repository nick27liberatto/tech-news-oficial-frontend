import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ValidationErrorMessageComponent } from '../../components/validation-error-message/validation-error-message.component';
import { PasswordService } from '../../services/password.service';
import { SupabaseService } from '../../services/supabase.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password-form-page',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, ValidationErrorMessageComponent],
  templateUrl: './reset-password-form-page.html',
  styleUrl: './reset-password-form-page.scss'
})
export class ResetPasswordFormPage {
  private supabaseService = inject(SupabaseService);
  private passwordService = inject(PasswordService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  form: FormGroup = new FormGroup({
    senha: new FormControl('', [
      Validators.required,
      this.passwordService.passwordStrengthValidator()
    ]),
    confirmarSenha: new FormControl('', [
      Validators.required
    ]),
  }, {
    validators: [PasswordService.passwordMismatch('senha', 'confirmarSenha')]
  });

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { data, error }  = await this.supabaseService.client.auth.updateUser({
      password: this.senha.value
    });

    if (error) {
      console.error('Error updating password:', error.message);
      this.snackBar.open(error.message, undefined, {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: 'custom-snackbar-error'
      });
      return;
    }

    console.log('Password updated successfully:', data);
    this.snackBar.open('Senha atualizada com sucesso!', undefined, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'custom-snackbar-success'
    });
    this.form.reset();
    this.router.navigate(['/login']);
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

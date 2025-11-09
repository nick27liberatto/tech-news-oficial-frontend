import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormValidationErrors } from '../../models/form-validation-errors.model';
import { ValidationErrorMessageComponent } from '../../components/validation-error-message/validation-error-message.component';
import { PasswordService } from '../../services/password.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password-form-page',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, ValidationErrorMessageComponent],
  templateUrl: './reset-password-form-page.html',
  styleUrl: './reset-password-form-page.scss'
})
export class ResetPasswordFormPage {

  constructor(private snackBar: MatSnackBar) {}

  private route = inject(Router).routerState.root;
  private router = inject(Router);
  private passwordService = inject(PasswordService);
  private authService = inject(AuthService);

  formValidationErrors: FormValidationErrors = new FormValidationErrors();
  form: FormGroup = new FormGroup({
    senha: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      this.passwordService.passwordStrengthValidator()
    ]),
    confirmarSenha: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
  }, {
    validators: [PasswordService.passwordMismatch('senha', 'confirmarSenha')]
  });

  onSubmit() {
    if (this.form.valid) {
      const email: string = this.route.snapshot.queryParams['email'];
      const token: string = this.route.snapshot.queryParams['token'];

      this.authService.resetPassword(email, token, this.senha.value)
        .subscribe({
          next: (response: any) => {
            if (response.isSuccess) {
              this.snackBar.open('Senha redefinida com sucesso!', 'Fechar', { duration: 3000 });
              this.onResetForm();
              this.router.navigate(['/login']);
            } else {
              const errorMsg = response.errors?.join('\n') || 'Erro desconhecido';
              this.snackBar.open(errorMsg, 'Fechar', { duration: 4000 });
            }
          },
          error: (err) => {
            console.error('Erro na requisição:', err);
            this.snackBar.open('Erro ao conectar com o servidor.', 'Fechar', { duration: 4000 });
          }
        });

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

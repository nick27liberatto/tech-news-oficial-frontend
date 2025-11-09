import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ValidationErrorMessageComponent } from '../../components/validation-error-message/validation-error-message.component';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FluentResult } from '../../models/fluent-result.model';

@Component({
  selector: 'app-login-form-page',
  imports: [ReactiveFormsModule, RouterLink, ValidationErrorMessageComponent],
  templateUrl: './login-form-page.html',
  styleUrl: './login-form-page.scss'
})
export class LoginFormPage implements OnInit {
  private googleClient: any;
  private router = inject(Router);
  private authService = inject(AuthService);
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

  constructor(private snackBar: MatSnackBar) { }

  handleGoogleCredentialResponse(response: any) {
    const access_token = response.access_token;

    this.authService.socialLogin('Google', access_token).subscribe({
      next: (result: FluentResult<any>) => {
        if (result.isSuccess) {
          localStorage.setItem('id_token', result.value?.token);
          console.log('Login com Google realizado com sucesso!');
        } else {
          console.log('Erro: ' + result.errors?.join(', '));
        }
      },
      error: (err) => {
        console.error('Erro na requisição:', err);
        this.snackBar.open('Falha na comunicação com o servidor.', 'Fechar', { duration: 4000 });
      }
    });
  }

  ngOnInit() {
    // @ts-ignore
    this.googleClient = google.accounts.oauth2.initTokenClient({
      client_id: 'SEU_CLIENT_ID_DO_GOOGLE.apps.googleusercontent.com',
      scope: 'openid email profile',
      callback: (response: any) => this.handleGoogleCredentialResponse(response),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.email.value, this.password.value).subscribe({
        next: (response: any) => {
          if (response.isSuccess) {
            this.onResetForm();
            this.router.navigate(['/home']);
          } else {
            const errorMsg = response.errors?.join('\n') || 'Erro desconhecido';
            console.log('Erro: ' + errorMsg);
          }
        },
        error: (error) => {
          console.error('Erro na requisição:', error);
          this.snackBar.open('Erro ao conectar com o servidor.', 'Fechar', { duration: 4000 });
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onGoogleLogin() {
    if (!this.googleClient) {
      console.error('Google client não inicializado.');
      return;
    }

    this.googleClient.requestAccessToken();
  }

  onGithubLogin() {
    const token = localStorage.getItem('github_token');
    if (!token) {
      this.snackBar.open('Token do GitHub não encontrado.', 'Fechar', { duration: 4000 });
      return;
    }

    this.authService.socialLogin('GitHub', token).subscribe({
      next: (result: FluentResult<any>) => {
        if (result.isSuccess) {
          localStorage.setItem('id_token', result.value?.token);
          console.log('Login com GitHub realizado com sucesso!');
          this.router.navigate(['/home']);
        } else {
          console.log('Erro: ' + result.errors?.join(', '));
        }
      },
      error: (err) => {
        console.error('Erro na requisição:', err);
        this.snackBar.open('Falha na comunicação com o servidor.', 'Fechar', { duration: 4000 });
      }
    });
  }

  onResetForm() {
    this.form.reset();
  }
}

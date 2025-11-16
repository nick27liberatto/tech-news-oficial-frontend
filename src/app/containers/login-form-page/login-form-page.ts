import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ValidationErrorMessageComponent } from '../../components/validation-error-message/validation-error-message.component';
import { SupabaseService } from '../../services/supabase.service';
import { AuthTokenResponsePassword } from '@supabase/supabase-js';
@Component({
  selector: 'app-login-form-page',
  imports: [ReactiveFormsModule, RouterLink, ValidationErrorMessageComponent],
  templateUrl: './login-form-page.html',
  styleUrl: './login-form-page.scss'
})
export class LoginFormPage {
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);
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
      this.supabaseService.signIn(this.form.value.email, this.form.value.password)
      .then((response:AuthTokenResponsePassword) => {
        if(response.error) {
          console.log('Erro ao realizar login.', response.error)
        } else {
          console.log('Sucesso ao realizar login!', response.data)
          this.router.navigate(['/home']);
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
    console.log('Login com Google não implementado.');
  }

  onGithubLogin() {
    console.log('Login com GitHub não implementado.');
  }

  onResetForm() {
    this.form.reset();
  }
}

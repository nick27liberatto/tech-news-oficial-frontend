import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ValidationErrorMessageComponent } from '../../components/validation-error-message/validation-error-message.component';
import { SupabaseService } from '../../services/supabase.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-login-form-page',
  imports: [ReactiveFormsModule, RouterLink, ValidationErrorMessageComponent, MatButtonToggleModule],
  templateUrl: './login-form-page.html',
  styleUrl: './login-form-page.scss'
})
export class LoginFormPage implements OnInit {
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  isMagicLink: boolean = false;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [Validators.required]),
    loginType: new FormControl('password')
  });

  ngOnInit(): void {
    this.loginType.valueChanges.subscribe(value => {
      this.isMagicLink = value === 'magic-link';
      if (this.isMagicLink) {
        this.password.clearValidators();
        this.password.disable();

      } else {
        this.password.setValidators(Validators.required);
        this.password.enable();
      }

      this.password.updateValueAndValidity();
    })
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  get loginType() {
    return this.form.get('loginType') as FormControl;
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let response: any;

    if (this.isMagicLink) {
      response = await this.supabaseService.signInWithOtp(this.email.value);
    } else {
      response = await this.supabaseService.signIn(this.email.value, this.password.value);
    }

    if (response.error) {
      console.log('Erro ao realizar login.', response.error)
      this.snackBar.open(response.error.message, undefined, {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: 'custom-error-snackbar'
      });
      return;
    }

    if (response.data.mfa) {
      let mfa = response.data.mfa;
      const factorId = mfa.factors[0].id;
      const challengeId = mfa.factors[0].challengeId;

      localStorage.setItem('mfa_factor_id', factorId);
      localStorage.setItem('mfa_challenge_id', challengeId);

      this.router.navigate(['/verify-totp']);
      return;
    }
    
    let successMsg = this.isMagicLink ? 'E-mail enviado com sucesso!' : 'Sucesso ao realizar login!';
    
    console.log(successMsg, response.data)
    this.snackBar.open(successMsg, undefined, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'custom-success-snackbar'
    });

    if (this.isMagicLink) {
      this.router.navigate(['/confirm-email']);
      return;
    }

    this.router.navigate(['/home']);
    return;
  }

  onGoogleLogin() {
    this.supabaseService.signInWithSocialAccount('google');
    this.router.navigate(['/home']);
  }

  onGithubLogin() {
    this.supabaseService.signInWithSocialAccount('github');
    this.router.navigate(['/home']);
  }

  onResetForm() {
    this.form.reset();
  }
}

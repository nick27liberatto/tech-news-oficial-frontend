import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TotpService } from '../../services/totp.service';

@Component({
  selector: 'app-verify-totp-page',
  imports: [RouterLink, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './verify-totp-page.html',
  styleUrl: './verify-totp-page.scss'
})

export class VerifyTotpPage {
  private router = inject(Router);
  private totpService = inject(TotpService);
  private snackBar = inject(MatSnackBar)

  form: FormGroup = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{6}$/)])
  })

  factorId = localStorage.getItem('mfa_factor_id');
  challengeId = localStorage.getItem('mfa_challenge_id');

  get code() {
    return this.form.get('code') as FormControl;
  }

  async verify() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.factorId || !this.challengeId) {
      this.snackBar.open('Erro: informações de MFA ausentes.', undefined, {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
        panelClass: 'custom-error-snackbar'
      });
      return;
    }

    const code = this.code.value;

    const { data, error } = await this.totpService.verifyTotpEnrollment(
      this.factorId,
      this.challengeId,
      code
    );

    if (error) {
      this.snackBar.open(error.message, undefined, {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
        panelClass: 'custom-error-snackbar'
      });
      return;
    }

    this.snackBar.open('MFA verificado com sucesso!', undefined, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: 'custom-success-snackbar'
    });

    localStorage.removeItem('mfa_factor_id');
    localStorage.removeItem('mfa_challenge_id');

    this.router.navigate(['/home']);
  }
}

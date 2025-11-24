import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TotpService } from '../../services/totp.service';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-verify-totp-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './verify-totp-page.html',
  styleUrl: './verify-totp-page.scss'
})

export class VerifyTotpPage  implements OnInit {
  private router = inject(Router);
  private supabaseService = inject(SupabaseService);
  private totpService = inject(TotpService);
  private snackBar = inject(MatSnackBar)
  backUrl:string = '';

  form: FormGroup = new FormGroup({
    code: new FormControl('')
  })

  factorId = localStorage.getItem('mfa_factor_id');
  challengeId = localStorage.getItem('mfa_challenge_id');

  get code() {
    return this.form.get('code') as FormControl;
  }

  ngOnInit(): void {
    this.getBackButtonUrl();
  }

  async getBackButtonUrl() {
    const user = await this.supabaseService.loggedUser();
    if (!user) {
      this.backUrl = '/login';
      return;
    }

    this.backUrl = '/home';
    return;
  }

  async verify() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.factorId) {
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
      this.challengeId!,
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

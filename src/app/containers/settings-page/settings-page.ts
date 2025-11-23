import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatSlideToggleChange, MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TotpService } from '../../services/totp.service';

@Component({
  selector: 'app-settings-page',
  imports: [RouterLink, MatSlideToggleModule],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss'
})
export class SettingsPage implements OnInit {
  private totpService = inject(TotpService);
  private snackBar = inject(MatSnackBar);
  mfaEnabled = false;
  factorId: string | null = null;

  async ngOnInit() {
    await this.checkMfaStatus();
  }

  async checkMfaStatus() {
    const { data, error } = await this.totpService.getMfaFactors();

    if (data) {
      const totp = data.all.find((f: any) => f.factor_type === 'totp' && f.status === 'verified');
      if (totp) {
        this.mfaEnabled = true;
        this.factorId = totp.id;
      }
    }
  }

  async toggleMfa(event: MatSlideToggleChange) {
    if (event.checked) {
      await this.enableMfa();
    } else {
      await this.disableMfa();
    }
  }

async enableMfa() {
  const { data, error } = await this.totpService.enrollTotp();

  if (error) {
    this.snackBar.open(error.message, undefined, { duration: 3000 });
    return;
  }

  const qrUri = data.totp?.uri;

  localStorage.setItem('mfa_factor_id', data.id);
  localStorage.setItem('mfa_challenge_id', '');

  window.location.href = '/setup-mfa?uri=' + encodeURIComponent(qrUri);
}

  async disableMfa() {
    if (!this.factorId) {
      this.snackBar.open('Nenhum fator TOTP encontrado.', undefined, { duration: 3000 });
      return;
    }

    const { error } = await this.totpService.unenrollTotp(this.factorId);

    if (error) {
      this.snackBar.open(error.message, undefined, { duration: 3000 });
      return;
    }

    this.snackBar.open('MFA desativado com sucesso!', undefined, { duration: 3000 });
    this.mfaEnabled = false;
  }

  onSubmit() {
    this.snackBar.open('Configurações salvas!', undefined, { duration: 2000 });
  }

}
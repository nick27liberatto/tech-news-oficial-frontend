import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
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
  private snackBarService = inject(MatSnackBar);
  mfaEnabled = false;
  factorId: string | null = null;
  challengeId:string | null = null;
  totpUri:string | null = null;

  async ngOnInit() {
    await this.checkMfaStatus();
  }

  async checkMfaStatus() {
    const { data, error } = await this.totpService.getMfaFactors();

    if (data && data.all.length > 0) {
      const totp = data.all.find((f: any) => f.factor_type === 'totp');
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
  const result = await this.totpService.setupTotp();

  this.factorId = result.factorId;
  this.challengeId = result.challengeId;
  this.totpUri = result.totpUri;

  window.location.href = '/setup-mfa?uri=' + encodeURIComponent(this.totpUri);
}

  async disableMfa() {
    if (!this.factorId) {
      this.snackBarService.open('Nenhum fator TOTP encontrado.', undefined, {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
        panelClass: 'custom-error-snackbar'
      });
      return;
    }

    const { error } = await this.totpService.unenrollTotp(this.factorId);

    if (error) {
      this.snackBarService.open(error.message, undefined, {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
        panelClass: 'custom-error-snackbar'
      });
      return;
    }

    this.snackBarService.open('MFA desativado com sucesso!', undefined, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: 'custom-sucess-snackbar'
    });
    this.mfaEnabled = false;
  }

  onSubmit() {
    this.snackBarService.open('Configurações salvas!', undefined, { duration: 2000 });
  }

}
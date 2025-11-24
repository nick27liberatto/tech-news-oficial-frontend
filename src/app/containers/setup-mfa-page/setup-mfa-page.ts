import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QrCodeComponent } from 'ng-qrcode';

@Component({
  selector: 'app-setup-mfa-page',
  imports: [QrCodeComponent, RouterLink],
  templateUrl: './setup-mfa-page.html',
  styleUrl: './setup-mfa-page.scss'
})
export class SetupMfaPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  qrUri: string | null = null;

  ngOnInit() {
    this.qrUri = this.route.snapshot.queryParamMap.get('uri');

    if (!this.qrUri) {
      console.error('Nenhuma URI TOTP recebida.');
      this.router.navigate(['/settings']);
      return;
    }
  }

  encodeURI(qrUri:string) {
    return encodeURIComponent(qrUri);
  }
}

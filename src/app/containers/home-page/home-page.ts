import { Component, inject, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Newsletter } from '../../models/newsletter.model';
import { NewsletterService } from '../../services/newsletter.service';
import { CommonModule } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-home-page',
  imports: [MatIconModule, MatMenuModule, MatButtonModule, MatCardModule, RouterLink, CommonModule, MatTooltipModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage implements OnInit {
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);
  private newsletterService = inject(NewsletterService);
  private themeService = inject(ThemeService);
  public user: any;

  news: Newsletter[] = [];
  form: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  constructor() {
    registerLocaleData(localePt);
  }

  async ngOnInit() {
    this.user = await this.supabaseService.loggedUser();
    
    this.loadNewsletters();

    this.newsletterService.refresh$.subscribe(() => {
      this.loadNewsletters();
    });
  }

  async loadNewsletters() {
    this.news = await this.newsletterService.getAll();
  }

  obterUsuarioPorEmail(email: string | undefined): string {
    return email ? email.split('@')[0] : 'Usuário Desconhecido';
  }

  toggleTheme() {
    return this.themeService.toggleTheme();
  }

  signOut() {
    console.log('User Logged Out')
    this.supabaseService.signOut();
    this.router.navigate(['/login']);
  }
}

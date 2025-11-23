import { Component, inject, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Newsletter, NewsletterWithProfile } from '../../models/newsletter.model';
import { NewsletterService } from '../../services/newsletter.service';
import { CommonModule } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../services/theme-service';
import { debounceTime } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '@supabase/auth-js';

@Component({
  selector: 'app-home-page',
  imports: [
    MatIconModule, MatMenuModule, MatButtonModule,
    MatCardModule, RouterLink, CommonModule,
    MatTooltipModule, ɵInternalFormsSharedModule,
    ReactiveFormsModule, MatSnackBarModule
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage implements OnInit {
  private supabaseService = inject(SupabaseService);
  private newsletterService = inject(NewsletterService);
  private themeService = inject(ThemeService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  user:any;
  news: NewsletterWithProfile[] = [];
  form: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  get search() {
    return this.form.get('search') as FormControl;
  }

  constructor() {
    registerLocaleData(localePt);
  }

  async ngOnInit() {
    this.loadNewsletters();

    this.search.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      this.loadNewsletters(value);
    });

    this.user = await this.supabaseService.loggedUser() as User;
  }

  async loadNewsletters(search: string = '') {
    try {
      this.news = await this.newsletterService.getAll(search);
    } catch (error) {
      console.log('Erro ao carregar notícias: ', error);
      this.snackBar.open(`Erro ao carregar notícias`, undefined, {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: 'custom-error-snackbar'
      });
    }
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

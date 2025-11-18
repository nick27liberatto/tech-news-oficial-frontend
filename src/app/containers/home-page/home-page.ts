import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  private supabaseService = inject(SupabaseService); 
  private router = inject(Router);

  signOut() {
    console.log('User Logged Out')
    this.supabaseService.signOut();
    this.router.navigate(['/login']);
   }
}

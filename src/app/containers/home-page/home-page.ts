import { Component, inject, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { map } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [MatIconModule, MatMenuModule, MatButtonModule, MatCardModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  private supabaseService = inject(SupabaseService); 
  private router = inject(Router);
  public userFullName: string = "Nicolas Liberatto";
  public userRole: string = "Owner";

  form: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  signOut() {
    console.log('User Logged Out')
    this.supabaseService.signOut();
    this.router.navigate(['/login']);
   }
}

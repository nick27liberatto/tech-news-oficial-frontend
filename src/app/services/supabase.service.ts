import { inject, Injectable, } from '@angular/core';
import { createClient, Provider, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.prod';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class SupabaseService {
  private supabaseclient: SupabaseClient;
  private user = new BehaviorSubject<User | null>(null);
  private router = inject(Router);

  constructor() {
    this.supabaseclient = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY);
    this.supabaseclient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this.user.next(session!.user);
        this.router.navigate(['/home']);
      } else {
        this.user.next(null);
      }
    });
  }

  signUp(fullName: string, email: string, password: string) {
    return this.supabaseclient.auth.signUp({
      email, password, options: {
        data: {
          display_name: fullName
        }
      }
    });
  }

  signIn(email: string, password: string) {
    return this.supabaseclient.auth.signInWithPassword({ email, password });
  }

  async signInWithSocialAccount(provider:Provider) {
    await this.supabaseclient.auth.signInWithOAuth({
      provider: provider
    })
  }

  async signOut() {
    await this.supabaseclient.auth.signOut();
  }

  get currentUser() {
    return this.user.asObservable();
  }
}

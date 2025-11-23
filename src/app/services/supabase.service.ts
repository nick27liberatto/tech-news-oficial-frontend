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
  private router = inject(Router);
  private user = new BehaviorSubject<User | null>(null);

  constructor() {
    this.supabaseclient = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY, {
      auth: {
        persistSession: true,
        detectSessionInUrl: true
      }
    });
    this.supabaseclient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this.user.next(session!.user);
        this.router.navigate(['/home']);
      } else {
        this.user.next(null);
      }
    });
  }

  get client() {
    return this.supabaseclient;
  }

  async createTotpFactor() {
    return await this.supabaseclient.auth.mfa.enroll({
      factorType: 'totp'
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

  signInWithOtp(email:string) {
    return this.supabaseclient.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: 'https://technewsoficial.vercel.app/home'
      }
    });
  }

  signIn(email: string, password: string) {
    return this.supabaseclient.auth.signInWithPassword({ email, password });
  }

  async signInWithSocialAccount(provider: Provider) {
    await this.supabaseclient.auth.signInWithOAuth({
      provider: provider
    })
  }

  async signOut() {
    await this.supabaseclient.auth.signOut();
    await this.supabaseclient.auth.refreshSession();
  }

  async checkAuthentication(): Promise<boolean> {
    const { data: { session }, error } = await this.supabaseclient.auth.getSession();

    if (error) {
      console.error('Error getting session:', error.message);
      this.router.navigate(['/login']);
      return false;
    }

    if (session) {
      console.log('User is authenticated:', session.user);
      return true;
    } else {
      console.log('User is not authenticated.');
      this.router.navigate(['/login']);
      return false;
    }
  }

  async loggedUser() {
    const { data } = await this.supabaseclient.auth.getUser();
    return data.user;
  }

  get emailConfirmed() {
    return true;
  }
}

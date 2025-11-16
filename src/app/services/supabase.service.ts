import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabaseclient: SupabaseClient;
  private SUPABASE_URL: string = process.env['SUPABASE_URL'] ?? environment.supabase.url;
  private SUPABASE_KEY: string = process.env['SUPABASE_KEY'] ?? environment.supabase.key;
  
  constructor() {
    this.supabaseclient = createClient(this.SUPABASE_URL, this.SUPABASE_KEY);
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
}

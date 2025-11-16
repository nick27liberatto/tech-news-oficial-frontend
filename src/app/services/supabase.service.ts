import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})

export class SupabaseService {
  private supabaseclient: SupabaseClient;
  private supabaseConfig = {
    url: process.env['SUPABASE_URL'] ?? "",
    key: process.env['SUPABASE_KEY'] ?? ""
  }
  constructor() {
    this.supabaseclient = createClient(this.supabaseConfig.url, this.supabaseConfig.key);
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

import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { inject } from '@angular/core';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);

  if (!supabaseService.AuthState()) {
    router.navigate(['/login']);
  }
  
  return supabaseService.AuthState();;
};

import { CanActivateFn } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { inject } from '@angular/core';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const supabaseService = inject(SupabaseService);
  return supabaseService.checkAuthentication();
};

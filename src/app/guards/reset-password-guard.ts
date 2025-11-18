import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

export const resetPasswordGuard: CanActivateFn = (route, state) => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);

  if (!supabaseService.emailConfirmed) {
    router.navigate(['/home']);
  }

  return supabaseService.emailConfirmed;
};

import { CanActivateFn, Router, withInMemoryScrolling } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { inject } from '@angular/core';

export const authenticatedGuard: CanActivateFn = async (route, state) => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);
  const user = await supabaseService.loggedUser();
  
  if(!user) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

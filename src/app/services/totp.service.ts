import { inject, Injectable } from "@angular/core";
import { SupabaseService } from "./supabase.service";

@Injectable({
    providedIn: 'root'
})

export class TotpService {
    private supabaseService = inject(SupabaseService);

    async getMfaFactors() {
        return await this.supabaseService.client.auth.mfa.listFactors();
    }

    async enrollTotp() {
        return await this.supabaseService.client.auth.mfa.enroll({
            factorType: 'totp',
        });
    }

    async verifyTotpEnrollment(factorId: string, challengeId:string, code: string) {
        return await this.supabaseService.client.auth.mfa.verify({
            factorId,
            code,
            challengeId
        });
    }

    async unenrollTotp(factorId: string) {
        return await this.supabaseService.client.auth.mfa.unenroll({
            factorId
        });
    }
}
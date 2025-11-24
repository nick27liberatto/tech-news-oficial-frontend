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

    async verifyTotpEnrollment(factorId: string, challengeId: string, code: string) {
        return await this.supabaseService.client.auth.mfa.verify({
            factorId,
            challengeId,
            code
        });
    }

    async createTotpChallenge(factorId: string) {
        return await this.supabaseService.client.auth.mfa.challenge({
            factorId
        });
    }

    async unenrollTotp(factorId: string) {
        return await this.supabaseService.client.auth.mfa.unenroll({
            factorId
        });
    }

    async setupTotp() {

        const { data: enrollData, error: enrollError } =
            await this.supabaseService.client.auth.mfa.enroll({
                factorType: 'totp'
            });

        if (enrollError) throw enrollError;

        const factorId = enrollData.id;

        localStorage.setItem('mfa_factor_id', factorId);

        const { data: challengeData, error: challengeError } =
            await this.supabaseService.client.auth.mfa.challenge({
                factorId
            });

        if (challengeError) throw challengeError;

        const challengeId = challengeData.id;

        localStorage.setItem('mfa_challenge_id', challengeId);

        return {
            factorId,
            challengeId,
            totpUri: enrollData.totp?.uri
        };
    }

}
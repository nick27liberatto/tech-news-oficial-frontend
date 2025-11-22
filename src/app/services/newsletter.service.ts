import { inject, Injectable } from "@angular/core";
import { SupabaseService } from "./supabase.service";
import { Newsletter, NewsletterWithFile } from "../models/newsletter.model";
import { StorageService } from "./storage.service";
import { eBucketName } from "../shared/enums/bucket-name.enum";
import { environment } from "../../environments/environment.prod";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class NewsletterService {
    private supabaseService = inject(SupabaseService);
    private storageService = inject(StorageService);
    private _refresh$ = new BehaviorSubject<void>(undefined);
    refresh$ = this._refresh$.asObservable();

    async getAll() {
        const {data, error } = await this.supabaseService.client
            .from('newsletter')
            .select('*, profiles:user_id (full_name, email, avatar_url, role)')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const baseUrl = `${environment.SUPABASE_URL}/storage/v1/object/public/${eBucketName.NEWSLETTER}`;
        const result = data.map(item => ({
            ...item,
            imageUrl: item.imageUrl ? `${baseUrl}/${item.imageUrl}` : null
        }));

        return result;
    }

    getById(id: number) {
        return this.supabaseService.client.from('newsletter').select('*').eq('id', id).single();
    }

    async publish(newsletter: NewsletterWithFile) {
        if (newsletter.file) {
            const filePath = await this.storageService.uploadFile(eBucketName.NEWSLETTER, newsletter.file);
            newsletter.imageUrl = filePath;
        }

        const payload = {
            title: newsletter.title,
            description: newsletter.description,
            imageUrl: newsletter.imageUrl,
            user_id: newsletter.user_id
        };

        this._refresh$.next();

        return this.supabaseService.client.from('newsletter').insert(payload);
    }

    update(id: number, newsletter: Newsletter) {
        return this.supabaseService.client.from('newsletter').update(newsletter).eq('id', id);
    }

    delete(id: number) {
        return this.supabaseService.client.from('newsletter').delete().eq('id', id);
    }
}
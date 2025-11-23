import { inject, Injectable } from "@angular/core";
import { SupabaseService } from "./supabase.service";
import { Newsletter, NewsletterWithFile } from "../models/newsletter.model";
import { StorageService } from "./storage.service";
import { eBucketName } from "../shared/enums/bucket-name.enum";
import { NewsApiResponse } from "../models/news-api.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.prod";

@Injectable({
    providedIn: 'root'
})

export class NewsletterService {
    private supabaseService = inject(SupabaseService);
    private storageService = inject(StorageService);
    private httpClient = inject(HttpClient);

    getNewsFromExternalApi() : Observable<NewsApiResponse> {
        const url = `https://newsapi.org/v2/top-headlines?apiKey=${environment.NEWS_API_KEY}&country=us`;
        return this.httpClient.get<NewsApiResponse>(url);
    }

    async getAll(search: string = '') {
        let query = this.supabaseService.client
            .from('newsletter_with_profiles')
            .select('*');

        if (search) {
            const searchTerm = `%${search}%`;
            query = query.ilike('search_text', searchTerm);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

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

        return this.supabaseService.client.from('newsletter').insert(payload);
    }

    update(id: number, newsletter: Newsletter) {
        return this.supabaseService.client.from('newsletter').update(newsletter).eq('id', id);
    }

    delete(id: number) {
        return this.supabaseService.client.from('newsletter').delete().eq('id', id);
    }
}
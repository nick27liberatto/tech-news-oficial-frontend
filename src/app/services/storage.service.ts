import { inject, Injectable, } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { eBucketName } from '../shared/enums/bucket-name.enum';
import { v4 as uuid } from 'uuid';

@Injectable({
    providedIn: 'root'
})

export class StorageService {
    private supabaseService = inject(SupabaseService);
    private supabaseclient: SupabaseClient = this.supabaseService.supabaseClient();

    constructor() { }

    async uploadFile(bucket: eBucketName, file: File, filePath?: string) {
        if (filePath) this.deleteFile(bucket, filePath);

        filePath = this.generateFilePath(file);

        const { data, error } = await this.supabaseclient
            .storage
            .from(bucket)
            .upload(filePath, file);

        if (error) throw error;
        return filePath;
    }

    updateFile(bucket: eBucketName, file: File, path: string) {
        return this.supabaseclient.storage.from(bucket).update(path, file);
    }

    downloadFile(bucket: eBucketName, filePath: string) {
        return this.supabaseclient.storage.from(bucket).download(filePath);
    }

    deleteFile(bucket: eBucketName, filePath: string) {
        return this.supabaseclient.storage.from(bucket).remove([filePath]);
    }

    private generateFilePath(file: File): string {
        const fileExtension = file.name.split('.').pop();
        return `${uuid()}.${fileExtension}`;
    }
}

export interface Newsletter {
    title:string;
    description:string;
    imageUrl?:string;
    user_id: string;
    profiles?: Profile;
    created_at?: string;
}

export type NewsletterWithFile = Newsletter & { file?: File };

export interface Profile {
    full_name: string;
    email: string;
    avatar_url: string;
    role: string;
}
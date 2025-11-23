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

export interface NewsletterWithProfile {
    id:number
    title:string
    description:string
    created_at:string
    imageUrl:string
    user_id:string
    profile_id:string
    profile_full_name:string
    profile_email:string
    profile_avatar_url:string
    profile_role:string
}
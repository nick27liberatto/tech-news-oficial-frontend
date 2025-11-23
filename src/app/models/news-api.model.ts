export interface WebzApiResponse {
    posts:Post[]
}

export interface Post {
    thread:Thread
    url:string,
    author:string,
    published:string
    title:string
    text:string
    categories:string[]
    main_image:string
}

export interface Thread {
    site:string
    url:string,
    author:string,
    published:string
    title:string
    text:string
    categories:string[]
    main_image:string
}
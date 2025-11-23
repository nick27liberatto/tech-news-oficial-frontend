export interface NewsApiResponse {
    status:string
    totalResults:number
    articles:Article[]
}

export interface Article {
    author:string
    title:string
    description:string
    url:string
    urlToImage:string
    publishedAt:string
}
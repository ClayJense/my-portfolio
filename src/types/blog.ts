export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readingTime: number
  tags: string[]
  image?: string
}

export interface BlogPostListItem
  extends Pick<BlogPost, "slug" | "title" | "excerpt" | "date" | "tags" | "readingTime" | "image"> {}

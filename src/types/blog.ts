export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  content?: string;
  published: boolean;
}

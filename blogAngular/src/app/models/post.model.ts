export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: Date;
  imageUrl?: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  date: Date;
}
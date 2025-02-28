import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post, Comment } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'Introdução ao Angular',
      content: 'Angular é uma plataforma para construção de aplicativos web para dispositivos móveis e desktop. Junte-se à comunidade de milhões de desenvolvedores que criam interfaces de usuário atraentes com Angular.',
      author: 'Gustavo Sanchez',
      date: new Date('2025-02-28'),
      imageUrl: 'https://angular.io/assets/images/logos/angular/angular.svg',
      comments: [
        {
          id: 1,
          postId: 1,
          author: 'Gustavo',
          content: 'Muito bom parabens',
          date: new Date('2025-02-28')
        },
        {
          id: 2,
          postId: 1,
          author: 'Gustavo',
          content: 'Incrivel',
          date: new Date('2025-02-28')
        }
      ]
    },
  ];

  private postsSubject = new BehaviorSubject<Post[]>(this.posts);

  getPosts(): Observable<Post[]> {
    return this.postsSubject.asObservable();
  }

  getPostById(id: number): Post | undefined {
    return this.posts.find(post => post.id === id);
  }

  addPost(post: Omit<Post, 'id' | 'date' | 'comments'>): void {
    const newPost: Post = {
      ...post,
      id: this.getNextId(),
      date: new Date(),
      comments: []
    };
    
    this.posts = [newPost, ...this.posts];
    this.postsSubject.next(this.posts);
  }

  addComment(postId: number, comment: Omit<Comment, 'id' | 'postId' | 'date'>): void {
    const post = this.posts.find(p => p.id === postId);
    
    if (post) {
      const newComment: Comment = {
        ...comment,
        id: this.getNextCommentId(post),
        postId,
        date: new Date()
      };
      
      post.comments.push(newComment);
      this.postsSubject.next(this.posts);
    }
  }

  private getNextId(): number {
    return Math.max(0, ...this.posts.map(post => post.id)) + 1;
  }

  private getNextCommentId(post: Post): number {
    return Math.max(0, ...post.comments.map(comment => comment.id)) + 1;
  }
}
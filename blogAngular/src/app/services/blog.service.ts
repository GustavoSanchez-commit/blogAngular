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
      title: 'Getting Started with Angular',
      content: 'Angular is a platform for building mobile and desktop web applications. Join the community of millions of developers who build compelling user interfaces with Angular.',
      author: 'John Doe',
      date: new Date('2023-06-15'),
      imageUrl: 'https://angular.io/assets/images/logos/angular/angular.svg',
      comments: [
        {
          id: 1,
          postId: 1,
          author: 'Jane Smith',
          content: 'Great introduction to Angular!',
          date: new Date('2023-06-16')
        },
        {
          id: 2,
          postId: 1,
          author: 'Bob Johnson',
          content: 'I found this very helpful. Thanks!',
          date: new Date('2023-06-17')
        }
      ]
    },
    {
      id: 2,
      title: 'Angular Components Deep Dive',
      content: 'Components are the main building block for Angular applications. Each component consists of an HTML template that declares what renders on the page and a TypeScript class that defines behavior.',
      author: 'Jane Smith',
      date: new Date('2023-06-20'),
      imageUrl: 'https://angular.io/generated/images/guide/architecture/component-tree.png',
      comments: [
        {
          id: 3,
          postId: 2,
          author: 'John Doe',
          content: 'Components are indeed the heart of Angular!',
          date: new Date('2023-06-21')
        }
      ]
    },
    {
      id: 3,
      title: 'Reactive Forms in Angular',
      content: 'Reactive forms provide a model-driven approach to handling form inputs whose values change over time. This guide shows you how to create and update a basic form control, progress to using multiple controls in a group, validate form values, and create dynamic forms.',
      author: 'Bob Johnson',
      date: new Date('2023-06-25'),
      imageUrl: 'https://angular.io/generated/images/guide/forms-overview/forms-overview.png',
      comments: []
    }
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
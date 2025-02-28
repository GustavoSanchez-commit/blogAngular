import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <h2>Latest Posts</h2>
      <div class="posts">
        @for (post of posts; track post.id) {
          <div class="post-card card">
            <div class="post-header">
              <h3>{{ post.title }}</h3>
              <div class="post-meta">
                <span><i class="fas fa-user"></i> {{ post.author }}</span>
                <span><i class="fas fa-calendar"></i> {{ post.date | date }}</span>
                <span><i class="fas fa-comments"></i> {{ post.comments.length }} comments</span>
              </div>
            </div>
            @if (post.imageUrl) {
              <img [src]="post.imageUrl" alt="{{ post.title }}" class="post-image">
            }
            <p class="post-excerpt">{{ post.content | slice:0:200 }}...</p>
            <a [routerLink]="['/post', post.id]" class="btn">Read More</a>
          </div>
        } @empty {
          <p>No posts available.</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .posts {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    
    .post-card {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    .post-header {
      margin-bottom: 15px;
    }
    
    h2 {
      margin: 20px 0;
      color: #2c3e50;
    }
    
    h3 {
      color: #3498db;
      margin-bottom: 10px;
    }
    
    .post-meta {
      display: flex;
      gap: 15px;
      color: #7f8c8d;
      font-size: 0.9rem;
      margin-bottom: 10px;
    }
    
    .post-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 5px;
      margin-bottom: 15px;
    }
    
    .post-excerpt {
      flex-grow: 1;
      margin-bottom: 15px;
    }
  `]
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
}
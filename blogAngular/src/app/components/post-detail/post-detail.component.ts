import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      @if (post) {
        <div class="post-detail card">
          <h2>{{ post.title }}</h2>
          <div class="post-meta">
            <span><i class="fas fa-user"></i> {{ post.author }}</span>
            <span><i class="fas fa-calendar"></i> {{ post.date | date }}</span>
          </div>
          
          @if (post.imageUrl) {
            <img [src]="post.imageUrl" alt="{{ post.title }}" class="post-image">
          }
          
          <div class="post-content">
            <p>{{ post.content }}</p>
          </div>
          
          <div class="comments-section">
            <h3>Comments ({{ post.comments.length }})</h3>
            
            <div class="comment-form card">
              <h4>Add a Comment</h4>
              <form (submit)="addComment()">
                <div class="form-control">
                  <label for="author">Name</label>
                  <input 
                    type="text" 
                    id="author" 
                    name="author" 
                    [(ngModel)]="newComment.author" 
                    required
                  />
                </div>
                <div class="form-control">
                  <label for="content">Comment</label>
                  <textarea 
                    id="content" 
                    name="content" 
                    [(ngModel)]="newComment.content" 
                    required
                  ></textarea>
                </div>
                <button type="submit" class="btn btn-block">Submit Comment</button>
              </form>
            </div>
            
            @if (post.comments.length > 0) {
              <div class="comments-list">
                @for (comment of post.comments; track comment.id) {
                  <div class="comment card">
                    <div class="comment-header">
                      <h4>{{ comment.author }}</h4>
                      <span>{{ comment.date | date }}</span>
                    </div>
                    <p>{{ comment.content }}</p>
                  </div>
                }
              </div>
            } @else {
              <p>No comments yet. Be the first to comment!</p>
            }
          </div>
        </div>
      } @else {
        <div class="error-message">
          <h2>Post not found</h2>
          <p>The post you're looking for doesn't exist or has been removed.</p>
          <button class="btn" (click)="goBack()">Go Back</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .post-detail {
      padding: 30px;
    }
    
    h2 {
      color: #2c3e50;
      margin-bottom: 15px;
    }
    
    .post-meta {
      display: flex;
      gap: 15px;
      color: #7f8c8d;
      margin-bottom: 20px;
    }
    
    .post-image {
      width: 100%;
      max-height: 400px;
      object-fit: cover;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    
    .post-content {
      font-size: 1.1rem;
      line-height: 1.8;
      margin-bottom: 30px;
    }
    
    .comments-section {
      margin-top: 30px;
    }
    
    .comments-section h3 {
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e6e6e6;
    }
    
    .comment-form {
      margin-bottom: 30px;
    }
    
    .comment {
      margin-bottom: 15px;
    }
    
    .comment-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    
    .comment-header h4 {
      color: #3498db;
    }
    
    .comment-header span {
      color: #7f8c8d;
      font-size: 0.9rem;
    }
    
    .error-message {
      text-align: center;
      padding: 50px 0;
    }
    
    .error-message h2 {
      color: #e74c3c;
      margin-bottom: 15px;
    }
    
    .error-message p {
      margin-bottom: 20px;
    }
  `]
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;
  newComment = { author: '', content: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.post = this.blogService.getPostById(id);
  }

  addComment(): void {
    if (this.post && this.newComment.author && this.newComment.content) {
      this.blogService.addComment(this.post.id, this.newComment);
      this.newComment = { author: '', content: '' };
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
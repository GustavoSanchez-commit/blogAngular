import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="card">
        <h2>Create New Post</h2>
        <form (submit)="submitPost()">
          <div class="form-control">
            <label for="title">Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              [(ngModel)]="newPost.title" 
              required
            />
          </div>
          
          <div class="form-control">
            <label for="author">Author</label>
            <input 
              type="text" 
              id="author" 
              name="author" 
              [(ngModel)]="newPost.author" 
              required
            />
          </div>
          
          <div class="form-control">
            <label for="imageUrl">Image URL (optional)</label>
            <input 
              type="text" 
              id="imageUrl" 
              name="imageUrl" 
              [(ngModel)]="newPost.imageUrl"
            />
          </div>
          
          <div class="form-control">
            <label for="content">Content</label>
            <textarea 
              id="content" 
              name="content" 
              [(ngModel)]="newPost.content" 
              required
            ></textarea>
          </div>
          
          <div class="form-buttons">
            <button type="button" class="btn" (click)="cancel()">Cancel</button>
            <button type="submit" class="btn">Publish Post</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    h2 {
      color: #2c3e50;
      margin-bottom: 20px;
    }
    
    .form-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
  `]
})
export class NewPostComponent {
  newPost = {
    title: '',
    author: '',
    content: '',
    imageUrl: ''
  };

  constructor(
    private blogService: BlogService,
    private router: Router
  ) {}

  submitPost(): void {
    if (this.newPost.title && this.newPost.author && this.newPost.content) {
      this.blogService.addPost(this.newPost);
      this.router.navigate(['/']);
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
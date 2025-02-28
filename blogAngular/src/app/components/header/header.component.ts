import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="header container">
      <h1><i class="fas fa-blog"></i> Angular Blog</h1>
      <nav>
        <a routerLink="/" class="btn">Home</a>
        <a routerLink="/new-post" class="btn">New Post</a>
      </nav>
    </header>
  `,
  styles: [`
    h1 {
      color: #3498db;
      font-size: 2rem;
    }
    
    nav {
      display: flex;
      gap: 10px;
    }
  `]
})
export class HeaderComponent {}
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { routes } from './app/app.routes';
import { HeaderComponent } from './app/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main {
      min-height: calc(100vh - 180px);
      padding: 20px 0;
    }
    
    .footer {
      text-align: center;
      padding: 20px 0;
      margin-top: 40px;
      background-color: #2c3e50;
      color: white;
    }
  `]
})
export class App {
  constructor() {}
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes)
  ]
});
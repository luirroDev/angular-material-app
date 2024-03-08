import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginBootstrapComponent } from './pages/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginBootstrapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'sistema-gestion-hospitalaria';
}

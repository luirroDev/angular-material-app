import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { User } from '@/app/interfaces/user.interface';
import { AuthService } from '@/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  currentUser: User | null = null;

  private readonly _authSrv = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    // this.currentUser = this._authSrv.getAuthenticatedUser();
  }

  sesionLogout() {
    this._authSrv.logout();
    this.router.navigate(['login']);
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { User } from '@/app/interfaces/user.interface';
import { ComunicationService } from '@/app/services/comunication.service';
import { AuthService } from '@/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  public currentUser: User | null = null;
  private readonly router = inject(Router);
  private readonly authSrv = inject(AuthService);
  private readonly communicationSrv = inject(ComunicationService);

  ngOnInit(): void {
    this.communicationSrv.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  sesionLogout() {
    this.authSrv.logout();
    this.router.navigate(['/login']);
  }
}

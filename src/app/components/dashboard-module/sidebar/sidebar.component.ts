import { Component, inject } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatButtonModule, RouterLink, AsyncPipe, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private readonly _menuServ = inject(MenuService);
  menuItems$ = this._menuServ.getMenu();
}

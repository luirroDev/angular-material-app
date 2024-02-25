import { Component } from '@angular/core';
import { user } from '../../../interfaces/user.interface';
// material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

const ELEMENT_DATA: user[] = [
  { user: 'jperez', name: 'Juan', lastName: 'Perez', gender: 'male' },
  { user: 'jperez', name: 'Juan', lastName: 'Perez', gender: 'male' },
  { user: 'jperez', name: 'Juan', lastName: 'Perez', gender: 'male' },
  { user: 'jperez', name: 'Juan', lastName: 'Perez', gender: 'male' },
  { user: 'jperez', name: 'Juan', lastName: 'Perez', gender: 'male' },
  { user: 'jperez', name: 'Juan', lastName: 'Perez', gender: 'male' },
  { user: 'jperez', name: 'Juan', lastName: 'Perez', gender: 'male' },
];

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  displayedColumns: string[] = ['user', 'name', 'lastName', 'sex', 'actions'];
  dataSource = ELEMENT_DATA;
}

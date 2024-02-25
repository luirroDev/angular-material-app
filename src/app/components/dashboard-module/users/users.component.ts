import { Component } from '@angular/core';
import { user } from '../../../interfaces/user.interface';
// material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  displayedColumns: string[] = ['user', 'name', 'lastName', 'sex', 'actions'];
  userList: user[] = [
    { user: 'jperez', name: 'Juan', lastName: 'Perez', gender: 'male' },
    { user: 'jperez', name: 'Alexander', lastName: 'Diaz', gender: 'male' },
    { user: 'jperez', name: 'Juan', lastName: 'Perez', gender: 'male' },
    { user: 'jperez', name: 'Juan', lastName: 'Perez', gender: 'male' },
    { user: 'jperez', name: 'Juan', lastName: 'Perez', gender: 'male' },
    { user: 'jperez', name: 'Juan', lastName: 'Perez', gender: 'male' },
    { user: 'jperez', name: 'Juan', lastName: 'Perez', gender: 'male' },
  ];
  dataSource = new MatTableDataSource(this.userList);

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

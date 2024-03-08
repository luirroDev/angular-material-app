import { Routes } from '@angular/router';
import { LoginBootstrapComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/dashboard-module/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'login',
    component: LoginBootstrapComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

import { Routes } from '@angular/router';
import { LoginBootstrapComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-up',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
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
    path: 'sign-up',
    component: SignupComponent,
  },
  {
    path: '**',
    redirectTo: 'sign-up',
    pathMatch: 'full',
  },
  // {
  //   "nombre": "Tratamiento",
  //   "redirect": "/dashboard/tratamiento",
  //   "icon": "medical_services"
  // },
];

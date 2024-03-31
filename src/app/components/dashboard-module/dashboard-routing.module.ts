import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../../pages/home/home.component';
import { OrdenIngresoComponent } from '../../pages/orden-ingreso/orden-ingreso.component';
import { TratamientoComponent } from '../../pages/tratamiento/tratamiento.component';
import { ExpedienteComponent } from '../../pages/expediente/expediente.component';

import { authGuard } from '@/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'orden-ingreso',
        canActivate: [authGuard],
        component: OrdenIngresoComponent,
      },
      {
        path: 'tratamiento',
        canActivate: [authGuard],
        component: TratamientoComponent,
      },
      {
        path: 'expediente',
        canActivate: [authGuard],
        component: ExpedienteComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../../pages/home/home.component';
import { OrdenIngresoComponent } from '../../pages/orden-ingreso/orden-ingreso.component';
import { TratamientoComponent } from '../../pages/tratamiento/tratamiento.component';
import { ExpedienteComponent } from '../../pages/expediente/expediente.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'orden-ingreso', component: OrdenIngresoComponent },
      { path: 'tratamiento', component: TratamientoComponent },
      { path: 'expediente', component: ExpedienteComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

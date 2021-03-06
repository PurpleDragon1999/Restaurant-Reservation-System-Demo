import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { TablesMenuComponent } from './components/tables-menu/tables-menu.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: TablesMenuComponent
  },
  {
    path: 'booking/:id', component: ReservationFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

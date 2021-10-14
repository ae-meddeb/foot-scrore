import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { GridComponent } from './components/grid/grid.component';

const routes: Routes = [
  {path: "", component: CompetitionsComponent},
  {path: "grid", component: GridComponent},
  {path: "league/:id", component: GridComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

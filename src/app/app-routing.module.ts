import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HistoryComponent } from './components/history/history.component';

const routes: Routes = [
  {path: 'home',component: HomeComponent},
  { path:'', pathMatch : 'full' , redirectTo: '/home' },
  {path: 'history',component: HistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
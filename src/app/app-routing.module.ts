import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
  {path: 'uploadFile',component: UploadComponent},
  { path:'', pathMatch : 'full' , redirectTo: '/uploadFile' },
  {path: 'history',component: HistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './components/courses/courses.component';

const routes: Routes = [
  { path: 'courses', component: CoursesComponent },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(mod => mod.LoginModule),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
